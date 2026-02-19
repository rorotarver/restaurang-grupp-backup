export interface BookingType {
    name:  string;
    address : {
        street: string;
        zip: string;
        postalCode: string;
    }
}

export interface BookingResponseType {
    id: string;
    name: string;
    date: string;
    time: string;
    numberOfPeople: number;
    contactInformation: {
        email: string;
        phone: string;
    }
}