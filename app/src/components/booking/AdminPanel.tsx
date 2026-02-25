'use client';

import { useState, useEffect, useCallback } from "react";
import { deleteBooking, getBookingsByRestaurant, updateBooking, createBooking } from "../../services/BookingService";
import { BookingFormData, BookingResponseType } from "../../types/booking.types";

export default function AdminPanel() {
    const [bookings, setBookings] = useState<BookingResponseType[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);
    const [editingBooking, setEditingBooking] = useState<BookingResponseType | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<BookingFormData>({
        date: '',
        time: '18:00',
        numberOfGuests: 1,
    });

    const restaurantId =
        process.env.NEXT_PUBLIC_RESTAURANT_ID || '6996f44b1f79230601108db6';

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            setFetchError(null);

            const data = await getBookingsByRestaurant(restaurantId);
            setBookings(data);

        } catch (err: unknown) {
            setFetchError(err instanceof Error ? err.message : String("Ett okänt fel uppstod"));
        } finally {
            setLoading(false);
        }
    }, [restaurantId]);

    useEffect(() => {
      fetchBookings();
    }, [fetchBookings]);

    const openCreateForm = () => {
        setFormData({ date: "", time: "18:00", numberOfGuests: 1 });
        setEditingBooking(null);
        setIsCreating(true);
        setFormError(null);
    };

    const closeForm = () => {
        setEditingBooking(null);
        setIsCreating(false);
        setFormError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!restaurantId) return setFormError("Restaurant ID saknas");
        setIsSaving(true);
        setFormError(null);

        try {
          if (editingBooking) {
            const updated = await updateBooking(editingBooking.id, {
              id: editingBooking.id,
              restaurantId: editingBooking.restaurantId,
              customerId: editingBooking.customerId,
              date: formData.date,
              time: formData.time,
              numberOfGuests: formData.numberOfGuests,
            });
            setBookings((prev) =>
              prev.map((b) => (b.id === updated.id ? updated : b))
            );
          } else if (isCreating) {
            const newBooking = await createBooking({
              restaurantId,
              ...formData,
              customer: {
                name: "Admin",
                lastname: "User",
                email: "example@example.com",
                phone: "0712345678",
              },
            });
            await fetchBookings();
            setBookings((prev) => [...prev, newBooking]);
          }
          closeForm();
          setFormData({ date: "", time: "18:00", numberOfGuests: 1 });
        } catch (err: unknown) {
          setFormError(err instanceof Error ? err.message : "Ett okänt fel uppstod");
        } finally {
          setIsSaving(false);
        }
    };

    const handleDeleteBooking = async (bookingId: string) => {
        const shouldDelete = window.confirm(
            'Är du säker på att du vill ta bort bokningen?'
        );

        if (!shouldDelete) {
            return;
        }

        try {
            setDeletingBookingId(bookingId);
            setFetchError(null);
            await deleteBooking(bookingId);
            setBookings((previous) => previous.filter((booking) => booking.id !== bookingId));
        } catch (err: unknown) {
            setFetchError(err instanceof Error ? err.message : "Ett okänt fel uppstod");
        } finally {
            setDeletingBookingId(null);
        }
    };

   return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Admin - Bokningar</h1>

        <button aria-label="Skapa ny bokning"
          type="button"
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={openCreateForm}
        >
          Skapa ny bokning
        </button>

        {(editingBooking || isCreating) && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h2 className="text-xl font-bold mb-2">
              {editingBooking ? "Redigera bokning" : "Ny bokning"}
            </h2>

            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="border p-2 mb-2 w-full"
              required
            />

            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="border p-2 mb-2 w-full"
              required
            >
              <option value="">Välj tid</option>
              <option value="18:00">18:00</option>
              <option value="21:00">21:00</option>
            </select>

            <input
              type="number"
              value={formData.numberOfGuests}
              min={1}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  numberOfGuests: e.target.value === "" ? 1 : parseInt(e.target.value),
                })
              }
              className="border p-2 mb-2 w-full"
              placeholder="Antal gäster"
              required
            />

            <div className="flex gap-2">
              <button aria-label="Spara bokning"
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isSaving}
              >
                {isSaving ? "Sparar..." : "Spara"}
              </button>
              <button aria-label="Avbryt"
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeForm}
              >
                Avbryt
              </button>
            </div>

            {formError && <p className="text-red-500 mt-2">{formError}</p>}
          </form>
        )}
        {fetchError && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {fetchError}
            </div>
        )}

        {loading && <p>Laddar bokningar...</p>}

        {!loading && !fetchError && bookings.length === 0 && (
          <p>{ "Inga bokningar hittades."}</p>
        )}

        {!loading && !fetchError && bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="py-2 px-4 text-left">Datum</th>
                  <th className="py-2 px-4 text-left">Tid</th>
                  <th className="py-2 px-4 text-left">Antal gäster</th>
                  <th className="py-2 px-4 text-left">Kund-ID</th>
                  <th className="py-2 px-4 text-left">Åtgärder</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2 px-4">{booking.date}</td>
                    <td className="py-2 px-4">{booking.time}</td>
                    <td className="py-2 px-4">{booking.numberOfGuests}</td>
                    <td className="py-2 px-4">{booking.customerId}</td>
                    <td className="py-2 px-4">
                      <button aria-label="Redigera bokning"
                        className="text-blue-500 mr-2"
                        onClick={() => {
                          setEditingBooking(booking);
                          setFormData({
                            date: booking.date,
                            time: booking.time,
                            numberOfGuests: booking.numberOfGuests,
                          });
                          setIsCreating(false);
                        }}
                      >
                        Redigera
                      </button>
                      <button aria-label="Ta bort bokning"
                        className="text-red-500 disabled:opacity-50"
                        onClick={() => handleDeleteBooking(booking.id)}
                        disabled={deletingBookingId === booking.id}
                      >
                        {deletingBookingId === booking.id ? "Tar bort..." : "Ta bort"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
