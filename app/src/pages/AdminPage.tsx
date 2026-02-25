'use client';

import { useState, useEffect, useCallback } from "react";
import { deleteBooking, getBookingsByRestaurant } from "../services/BookingService";
import { BookingFormData, BookingResponseType } from "../types/booking.types";



export default function AdminPage() {
    const [bookings, setBookings] = useState<BookingResponseType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);
    const [editingBooking, setEditingBooking] = useState<BookingResponseType | null>(null);
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
            setError(null);

            const data = await getBookingsByRestaurant(restaurantId);
            setBookings(data);

        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [restaurantId]);
    
    useEffect(() => {
      fetchBookings();
},    [fetchBookings]);

    const handleDeleteBooking = async (bookingId: string) => {
        const shouldDelete = window.confirm('Är du säker på att du vill ta bort bokningen?');
        if (!shouldDelete) {
            return;
        }

        try {
            setDeletingBookingId(bookingId);
            setError(null);
            await deleteBooking(bookingId);
            setBookings((previous) => previous.filter((booking) => booking.id !== bookingId));
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setDeletingBookingId(null);
        }
    };


    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <p>Laddar bokningar...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"> 
                <p className="text-red-500">Fel: {error}</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4">Admin - Bokningar</h1>

            {bookings.length === 0 ? (
                <p>Inga bokningar hittades.</p>
            ) : (
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                        <tr className="w-full bg-gray-200 dark:bg-gray-700">
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
                                   <button className="text-blue-500 mr-2" aria-label={`Redigera bokning ${booking.id}`} onClick={() => { 
                                    setEditingBooking(booking); 
                                    setFormData(booking); }}>Redigera</button>
                                   <button
                                       className="text-red-500 disabled:opacity-50"
                                       aria-label={`Ta bort bokning ${booking.id}`}
                                       onClick={() => handleDeleteBooking(booking.id)}
                                       disabled={deletingBookingId === booking.id}
                                   >
                                       {deletingBookingId === booking.id ? 'Tar bort...' : 'Ta bort'}
                                   </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );
}