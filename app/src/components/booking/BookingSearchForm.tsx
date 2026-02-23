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
};

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
};

export default function BookingSearchForm() {  
    const [state, dispatch] = useReducer(reducer, initialState);  

    const handleSearch = async (e: FormEvent) => { // Funktion som hanterar sökningen efter tillgängliga tider när användaren skickar in formuläret
        e.preventDefault();

        if (!state.date) {
            dispatch({ type: 'SEARCH_FAILURE', payload: 'Vänligen välj ett datum' }); // Validering för att säkerställa att ett datum har valts
            return;
        }

        if (state.numberOfGuests < 1) {
            dispatch({ type: 'SEARCH_FAILURE', payload: 'Antal gäster måste vara minst 1' });
            return;
        }
        
        dispatch({ type: 'SEARCH_START' });

        try {
            const bookings = await getBookingsByRestaurant(RESTAURANT_ID);
            const sameDate = bookings.filter((b) => b.date === state.date);

            const bookedAt18 = sameDate.filter((b) => b.time === '18:00').length;
            const bookedAt21 = sameDate.filter((b) => b.time === '21:00').length;

            const availableTimes: string [] = [];
            if (bookedAt18 < 15) availableTimes.push('18:00');
            if (bookedAt21 < 15) availableTimes.push('21:00');

            dispatch({ type: 'SEARCH_SUCCESS', payload: availableTimes });
                
        } catch {
            dispatch({ type: 'SEARCH_FAILURE', payload: 'Ett fel uppstod vid hämtning av bokningar' });
        }
    };

    return (
        <section>
            <form onSubmit={handleSearch} className="space-y-4">
                <input type='date' value={state.date} onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })} className="border p-2 w-full" />
                <input type='number' min={1} max={6} value={state.numberOfGuests} onChange={(e) => dispatch({ type: 'SET_NUMBER_OF_GUESTS', payload: Number(e.target.value) })} className="border p-2 w-full" />
                <button type='submit' disabled={state.isLoading} className="bg-blue-500 text-white px-4 py-2">{state.isLoading ? 'Söker...' : 'Sök tider'}</button>
            </form>

            {state.error && <p className="text-red-500 mt-2">{state.error}</p>}

            {state.hasSearched && !state.error && state.availableTimes.length === 0 && (
                <p className="text-gray-500 mt-2">Inga tillgängliga tider</p>
            )}

            {state.availableTimes.length > 0 && (
                <div className="mt-4">
                    <p className="text-green-500 mb-2">Tillgängliga tider:</p>
                    <ul>
                        {state.availableTimes.map((time) => (
                            <label key={time}>
                                {time}
                                <input type="radio" name="time" value={time} onChange={() => dispatch({ type: 'SELECT_TIME', payload: time })} />
                            </label>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
   
                }
  

