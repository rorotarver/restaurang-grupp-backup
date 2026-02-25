import {
    BookingResponseType,
    CreateBookingPayload,
    CreateBookingResponse,
} from '../types/booking.types';

// service för att hämta bokningsdata från API:et, samt för att hämta alla bokningar för en specifik restaurang

const BASE_URL = 'https://school-restaurant-api.azurewebsites.net';

const errorMessage = (response: Response) => `API request failed with status ${response.status}: ${response.statusText}`;

export const fetchBooking = async (bookingId: string): Promise<BookingResponseType> => {
    const response = await fetch(`${BASE_URL}/booking/${encodeURIComponent(bookingId)}`);
    if (!response.ok) {
        throw new Error(errorMessage(response));
    }
    const data: BookingResponseType = await response.json();
    if (!data) {
        throw new Error('Booking not found');
    }
    return data;
};

export const getBookingsByRestaurant = async (
    restaurantId: string,
): Promise<BookingResponseType[]> => {
    const response = await fetch(
        `${BASE_URL}/booking/restaurant/${encodeURIComponent(restaurantId)}`,
    );

    if (!response.ok) {
        throw new Error(errorMessage(response));
    }

    const data: BookingResponseType[] = await response.json();
    return data;
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
        throw new Error(errorMessage(response));
    }

    const data: CreateBookingResponse = await response.json();
    if (!data) {
        throw new Error('Failed to create booking');
    }

    return data;
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/booking/delete/${encodeURIComponent(bookingId)}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(errorMessage(response));
    }
};