'use client';

import { useState } from "react";
import BookingSearchForm, { SelectedBookingSlot } from "./BookingSearchForm";
import CustomerForm from "./CustomerForm";


export default function BookingFlow() {
    const [selectedSlot, setSelectedSlot] = useState<SelectedBookingSlot | null>(null);

    if (selectedSlot === null) {
        return (
            <div className="w-full">
                <BookingSearchForm onBookingSlotSelected={setSelectedSlot} />
            </div>
        );
    }

    return (
        <div className="w-full">
            <CustomerForm selectedSlot={selectedSlot} onCancel={() => setSelectedSlot(null)} />
        </div>
    );
}

