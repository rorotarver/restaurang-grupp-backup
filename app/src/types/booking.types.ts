// typer för bokningsrelaterd data


export interface BookingType {
    name:  string;
    address : {
        street: string;
        zip: string;
        postalCode: string;
    }
}

export interface BookingApiType {
    _id: string;
    restaurantId: string;
    date: string;
    time: string;
    numberOfGuests: number;
    customerId: string;
}

export interface BookingResponseType {
    _id: string;
    restaurantId: string;
    date: string;
    time: string;
    numberOfGuests: number;
    customerId: string;
}

export interface CreateBookingPayload {
    restaurantId: string;
    date: string;
    time: string;
    numberOfGuests: number;
    customer: {
        lastname: string;
        email: string;
        phone: string;
    };
}

export interface CreateBookingResponse {
    acknowledged: boolean;
    insertedId: string;
}