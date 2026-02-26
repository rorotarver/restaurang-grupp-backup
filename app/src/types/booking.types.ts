// typer för bokningsrelaterd data


export interface BookingResponseType {
    id: string;
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
        name: string;
        lastname: string;
        email: string;
        phone: string;
    };
}

export interface CreateBookingResponse {
    acknowledged: boolean;
    insertedId: string;
}

export interface UpdateBookingPayload {
    id: string;
    restaurantId: string;
    date: string;
    time: string;
    numberOfGuests: number;
    customerId: string;
}

export type BookingFormData = Omit<BookingResponseType, 'id' | 'customerId' | 'restaurantId'>;

  
  
