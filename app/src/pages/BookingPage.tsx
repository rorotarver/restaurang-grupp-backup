'use client';


import { useState } from "react";
import BookingSearchForm, { SelectedBookingSlot } from "../components/booking/BookingSearchForm"
import CustomerForm from "../components/booking/CustomerForm";


export default function BookingPage() {
    const [selectedSlot, setSelectedSlot] = useState<SelectedBookingSlot | null>(null);

    if(selectedSlot === null) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <BookingSearchForm onBookingSlotSelected={setSelectedSlot} />
            </div>
        )
    }

    if(selectedSlot) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
               <CustomerForm selectedSlot={selectedSlot} onCancel={() => setSelectedSlot(null)} />
            </div>
    )

   }

}