import {
    BookingResponseType,
    CreateBookingPayload,
    CreateBookingResponse,
    UpdateBookingPayload,
} from '../types/booking.types';

// service för att hämta bokningsdata från API:et, samt för att hämta alla bokningar för en specifik restaurang

const BASE_URL = 'https://school-restaurant-api.azurewebsites.net';

const errorMessage = (response: Response) => `API request failed with status ${response.status}: ${response.statusText}`;

type RawBookingResponse = Omit<BookingResponseType, 'id'> & {
    id?: string;
    _id?: string;
};

const normalizeBooking = (booking: RawBookingResponse): BookingResponseType => ({
    id: booking.id ?? booking._id ?? '',
    restaurantId: booking.restaurantId,
    date: booking.date,
    time: booking.time,
    numberOfGuests: booking.numberOfGuests,
    customerId: booking.customerId,
});

const parseJsonIfAny = async (response: Response): Promise<unknown | null> => {
    const text = await response.text();
    if (!text.trim()) {
        return null;
    }

    return JSON.parse(text);
};

export const fetchBooking = async (bookingId: string): Promise<BookingResponseType> => {
    const response = await fetch(`${BASE_URL}/booking/${encodeURIComponent(bookingId)}`);
    if (!response.ok) {
        throw new Error(errorMessage(response));
    }
    const data: RawBookingResponse = await response.json();
    if (!data) {
        throw new Error('Booking not found');
    }
    return normalizeBooking(data);
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

    const data: RawBookingResponse[] = await response.json();
    return data.map(normalizeBooking);
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

    const data = await response.json() as {
        acknowledged?: boolean;
        insertedId?: string;
    } & RawBookingResponse;

    if (!data) {
        throw new Error('Failed to create booking');
    }

    if (data.acknowledged && data.insertedId) {
        return {
            acknowledged: data.acknowledged,
            insertedId: data.insertedId,
        };
    }

    const normalized = normalizeBooking(data);
    return {
        acknowledged: true,
        insertedId: normalized.id,
    };
};


export const deleteBooking = async (bookingId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/booking/delete/${encodeURIComponent(bookingId)}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(errorMessage(response));
    }
};

export const updateBooking = async (bookingId: string, payload: UpdateBookingPayload): Promise<BookingResponseType> => {
    const response = await fetch(`${BASE_URL}/booking/update/${encodeURIComponent(bookingId)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(errorMessage(response));
    }

    const data = (await parseJsonIfAny(response)) as RawBookingResponse | null;
    if (!data) {
        return normalizeBooking({
            id: payload.id || bookingId,
            restaurantId: payload.restaurantId,
            date: payload.date,
            time: payload.time,
            numberOfGuests: payload.numberOfGuests,
            customerId: payload.customerId,
        });
    }

    return normalizeBooking(data);
};