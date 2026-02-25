'use client';

import { useState } from "react";
import BookingSearchForm, { SelectedBookingSlot } from "./BookingSearchForm";
import CustomerForm from "./CustomerForm";

export default function BookingFlow() {
    const [selectedSlot, setSelectedSlot] = useState<SelectedBookingSlot | null>(null);

    if (selectedSlot === null) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <BookingSearchForm onBookingSlotSelected={setSelectedSlot} />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <CustomerForm selectedSlot={selectedSlot} onCancel={() => setSelectedSlot(null)} />
        </div>
    );
}
