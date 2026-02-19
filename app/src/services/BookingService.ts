import {
    BookingResponseType,
    CreateBookingPayload,
    CreateBookingResponse,
} from '../types/booking.types';

// service för att hämta bokningsdata från API:et, samt för att hämta alla bokningar för en specifik restaurang

const BASE_URL = 'https://school-restaurant-api.azurewebsites.net';

export const fetchBooking = async (bookingId: string): Promise<BookingResponseType> => {
    const response = await fetch(`${BASE_URL}/booking/${bookingId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch booking: ${response.statusText}`);
    }
    const data: BookingResponseType[] = await response.json();
    if (data.length === 0) {
        throw new Error('Booking not found');
    }
    return data[0];
};

export const getBookingsByRestaurant = async (
    restaurantId: string,
): Promise<BookingResponseType[]> => {
    const response = await fetch(
        `${BASE_URL}/booking/restaurant/${restaurantId}`,
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch bookings for restaurant: ${response.statusText}`);
    }

    return response.json();
};

export const createBooking = async (
    payload: CreateBookingPayload,
): Promise<CreateBookingResponse> => {
    const response = await fetch(`${BASE_URL}/booking/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Failed to create booking: ${response.statusText}`);
    }

    return response.json();
};