'use client';

import { FormEvent, useReducer, useState } from 'react';
import { getBookingsByRestaurant } from '../../services/BookingService';

const RESTAURANT_ID = '6996f44b1f79230601108db6'; // Ersätt med korrekt restaurantId





type State = {    // Typdefinition för komponentens state
    date: string;
    numberOfGuests: number;
    availableTimes: string[];
    selectedTime: string | null;
    isLoading: boolean;
    error: string | null;                 
    hasSearched: boolean;
};

type Action =                                      // Typdefinition för reducer actions, vilka actions som är tillåtna och vilken payload de har
    | { type: 'SET_DATE'; payload: string }
    | { type: 'SET_NUMBER_OF_GUESTS'; payload: number }
    | { type: 'SEARCH_START' }
    | { type: 'SEARCH_SUCCESS'; payload: string[] }
    | { type: 'SEARCH_FAILURE'; payload: string }
    | { type: 'SELECT_TIME'; payload: string }
    | { type: 'RESET_SEARCH' };

const initialState: State = {     // Initialt state för komponenten innan användaren har gjort någon interaktion
    date: '',
    numberOfGuests: 1,
    availableTimes: [],
    selectedTime: null,
    isLoading: false,
    error: null,
    hasSearched: false,
}

function reducer(state: State, action: Action): State {    // Reducerfunktion som hanterar state-uppdateringar baserat på actions
    switch (action.type) {
        case 'SET_DATE':
            return { ...state, date: action.payload };
        case 'SET_NUMBER_OF_GUESTS':
            return { ...state, numberOfGuests: action.payload };
        case 'SEARCH_START':
            return { ...state, isLoading: true, error: null };
        case 'SEARCH_SUCCESS':
            return { ...state, isLoading: false, availableTimes: action.payload, hasSearched: true };
        case 'SEARCH_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        case 'SELECT_TIME':
            return { ...state, selectedTime: action.payload };
        case 'RESET_SEARCH':
            return initialState;
        default:
            return state;
    }
}

export default function BookingSearchForm() {  
    const[date, setDate] = useState('');
    const[numberOfGuests, setNumberOfGuests] = useState(1);
    const availableTimes = ['18:00', '19:00', '20:00']; // Exempel på tillgängliga tider
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                restaurantId: '6996f44b1f79230601108db6', // Ersätt med korrekt restaurantId
                date,
                time: '19:00', // Exempel på tid, kan göras dynamisk
                numberOfGuests,
                customer: {
                    name: 'John',
                    lastname: 'Doe',
                    email: '',
}