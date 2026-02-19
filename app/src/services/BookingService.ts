import { BookingResponseType } from '../types/booking.types';

const BASE_URL = 'https://school-restaurant-api.azurewebsites.net';

export const fetchBooking = async (bookingId: string): Promise<BookingResponseType> => {
    const response = await fetch(`${BASE_URL}/booking/${bookingId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch booking: ${response.statusText}`);
    }
    return response.json();
};

export const getBookingsByRestaurant = async (
    restaurantId: string,
): Promise<BookingResponseType[]> => {
    const response = await fetch(
        `${BASE_URL}/booking/restaurant/${restaurantId}`,
    );

    if (!response.ok) {
        throw new Error('Failed to fetch bookings for restaurant');
    }

    return response.json();
};
