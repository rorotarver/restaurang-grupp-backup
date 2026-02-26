'use client';

import { createBooking } from "../../services/BookingService";
import { SelectedBookingSlot } from "./BookingSearchForm"
import { FormEvent, useState } from "react";
import { getRestaurantIdOrThrow } from "../../utils/restaurant";

export type CustomerFormProps = {
    selectedSlot: SelectedBookingSlot | null;
    onCancel: () => void;
}

export default function CustomerForm({ selectedSlot, onCancel }: CustomerFormProps) {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [gdprAccepted, setGdprAccepted] = useState(false);




     const handleSubmit = async (e: FormEvent) => {

        setError(null);
        
        e.preventDefault();
        if (!name || !lastname || !email || !phone) {
            setError('Vänligen fyll i alla fält');
            return;
        }

        if (email && !/\S+@\S+\.\S+/.test(email)) {
            setError('Vänligen ange en giltig emailadress');
            return;
        }

        if (phone && !/^\d{10}$/.test(phone)) {
            setError('Vänligen ange ett giltigt telefonnummer (10 siffror)');
            return;
       }

       setIsSubmitting(true);

       if (!gdprAccepted) {
            setError('Du måste acceptera GDPR-villkoren för att fortsätta');
            setIsSubmitting(false);
            return;
        }


       try {
    const restaurantId = getRestaurantIdOrThrow();
        
        await createBooking({
        restaurantId,
                date: selectedSlot!.date,
                time: selectedSlot!.time,
                numberOfGuests: selectedSlot!.numberOfGuests,
                customer: {
                    name,
                    lastname,
                    email,
                    phone,
                },


            });
        
            
            setSuccessMessage('Bokning skickad!');
        } catch (error) {
            setError('Ett fel uppstod vid bokning. Vänligen försök igen.');
        } finally {
            setIsSubmitting(false);
        }
    }

if (!selectedSlot) {
    return (
        <div>
            <p className="text-red-500">Vänligen välj en tid innan du bokar.</p>
            <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 mt-4">Tillbaka</button>
        </div>
    );
}

return (
    <div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Förnamn" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" />
            <input type="text" placeholder="Efternamn" value={lastname} onChange={(e) => setLastname(e.target.value)} className="border p-2 w-full" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
            <input type="tel" placeholder="Telefonnummer" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 w-full" />
                <div className="flex items-start gap-2">
                  <input className="" type="checkbox" id="gdpr-consent" checked={gdprAccepted} onChange={(e) => setGdprAccepted(e.target.checked)} />
                  <label htmlFor="gdpr-consent" className="text-sm leading-5">Jag accepterar GDPR-villkoren
                  </label>
                </div>
            
                <p className="text-sm text-gray-600">Vi bryr oss om din integritet och hanterar dina uppgifter med omsorg. Dina uppgifter kommer endast att användas för bokningsändamål.</p>
             <div>
                <p><strong>Vald tid:</strong> {selectedSlot.date} kl {selectedSlot.time} · {selectedSlot.numberOfGuests} {selectedSlot.numberOfGuests === 1 ? 'gäst' : 'gäster'}</p>
             </div>
            <button type="submit" disabled={isSubmitting || !gdprAccepted} className="bg-green-500 text-white p-4 py-2">
                {isSubmitting ? 'Skickar...' : 'Bekräfta bokning'}
            </button>
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2">Avbryt</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
);

}

