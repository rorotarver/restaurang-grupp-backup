'use client';

import { FormEvent, useReducer } from 'react';
import { getBookingsByRestaurant } from '../../services/BookingService';
import { getRestaurantIdOrThrow } from '../../utils/restaurant';

export const RESTAURANT_ID: string = (() => {
    try {
        return getRestaurantIdOrThrow();
    } catch {
        return '';
    }
})();


// Bokningsflödets UI-state: sökinput, async-status och resultat av tillgängliga tider.
type State = {   
    date: string;
    numberOfGuests: number;
    selectionError: string | null;
    availableTimes: string[];
    selectedTime: string | null;
    isLoading: boolean;
    error: string | null;                 
    hasSearched: boolean;
};

// Actions beskriver alla tillåtna state-övergångar i formulärflödet (input -> sök -> resultat/fel).
type Action =                                      
    | { type: 'SET_DATE'; payload: string }
    | { type: 'SET_NUMBER_OF_GUESTS'; payload: number }
    | { type: 'SET_SELECTION_ERROR'; payload: string }
    | { type: 'CLEAR_SELECTION_ERROR' }
    | { type: 'SEARCH_START' }
    | { type: 'SEARCH_SUCCESS'; payload: string[] }
    | { type: 'SEARCH_FAILURE'; payload: string }
    | { type: 'SELECT_TIME'; payload: string }
    | { type: 'RESET_SEARCH' };

const initialState: State = {     // Initialt state för komponenten innan användaren har gjort någon interaktion
    date: '',
    numberOfGuests: 1,
    selectionError: null,
    availableTimes: [],
    selectedTime: null,
    isLoading: false,
    error: null,
    hasSearched: false,
};

export type SelectedBookingSlot = {
    date: string;
    time: string;
    numberOfGuests: number;
}

type BookingSearchFormProps = {
    onBookingSlotSelected: (slot: SelectedBookingSlot) => void;
}

function reducer(state: State, action: Action): State {    // Reducerfunktion som hanterar state-uppdateringar baserat på actions
    switch (action.type) {
        case 'SET_DATE':
            return { ...state, date: action.payload, selectionError: null, selectedTime: null, availableTimes: [], hasSearched: false };
        case 'SET_NUMBER_OF_GUESTS':
            return { ...state, numberOfGuests: action.payload, selectionError: null, selectedTime: null, availableTimes: [], hasSearched: false };
        case 'SET_SELECTION_ERROR':
            return { ...state, selectionError: action.payload };
        case 'CLEAR_SELECTION_ERROR':
            return { ...state, selectionError: null };
        case 'SEARCH_START':
            return { ...state, isLoading: true, error: null, selectionError: null, availableTimes: [], selectedTime: null };
        case 'SEARCH_SUCCESS':
            return { ...state, isLoading: false, availableTimes: action.payload, hasSearched: true };
        case 'SEARCH_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        case 'SELECT_TIME':
            return { ...state, selectedTime: action.payload, selectionError: null };
        case 'RESET_SEARCH':
            return initialState;
        default:
            return state;
    }
};

export default function BookingSearchForm({ onBookingSlotSelected }: BookingSearchFormProps) {  
    const [state, dispatch] = useReducer(reducer, initialState);  
    let buttonText = 'Sök tider';
    
    if (state.hasSearched && state.availableTimes.length > 0) buttonText = 'Fortsätt';
    
    const handleSearch = async (e: FormEvent) => { 
        e.preventDefault();

        if (state.hasSearched && state.availableTimes.length > 0 && !state.selectedTime) {
            dispatch({ type: 'SET_SELECTION_ERROR', payload: 'Vänligen välj en tid' });
            return;
        }

        if (state.hasSearched && state.selectedTime) {
            onBookingSlotSelected({ date: state.date, time: state.selectedTime, numberOfGuests: state.numberOfGuests });
            return;
        }

        // Affärsregel från uppgiften: antal gäster måste vara 1-6 och datum måste vara valt innan API-anrop.
        if (!state.date) {
            dispatch({ type: 'SEARCH_FAILURE', payload: 'Vänligen välj ett datum' }); 
            return;
        }

        if (state.numberOfGuests < 1 || state.numberOfGuests > 6) {
            dispatch({ type: 'SEARCH_FAILURE', payload: 'Antal gäster måste vara mellan 1 och 6' });
            return;
        }
        
        dispatch({ type: 'SEARCH_START' });

        try {
            if (!RESTAURANT_ID) {
                dispatch({ type: 'SEARCH_FAILURE', payload: 'Restaurant ID saknas i .env.local' });
                return;
            }
            const bookings = await getBookingsByRestaurant(RESTAURANT_ID);
            const sameDate = bookings.filter((b) => b.date === state.date);

            const bookedAt18 = sameDate.filter((b) => b.time === '18:00').length;
            const bookedAt21 = sameDate.filter((b) => b.time === '21:00').length;

            const availableTimes: string [] = [];
            // Tillgänglighet beräknas per sittning: restaurangen har 15 bord kl 18:00 och 15 bord kl 21:00.
            if (bookedAt18 < 15) availableTimes.push('18:00');
            if (bookedAt21 < 15) availableTimes.push('21:00');

            dispatch({ type: 'SEARCH_SUCCESS', payload: availableTimes });
                
        } catch {
            dispatch({ type: 'SEARCH_FAILURE', payload: 'Ett fel uppstod vid hämtning av bokningar' });
        }
    };

    return (
        <section className="w-full max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-5 p-2 sm:p-4">
                <input type='date' value={state.date} onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })} className="border rounded-md p-3 w-full" />
                <input type='number' min={1} max={6} value={state.numberOfGuests} onChange={(e) => dispatch({ type: 'SET_NUMBER_OF_GUESTS', payload: Number(e.target.value) })} className="border rounded-md p-3 w-full" />
                <button
                    type='submit'
                    disabled={state.isLoading}
                    className="landing-btn-submit w-full sm:w-auto"
                >
                    {state.isLoading ? 'Söker...' : buttonText}
                </button>
            </form>

            {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
            {state.selectionError && <p className="text-red-500 mt-2">{state.selectionError}</p>}

            {state.hasSearched && !state.error && state.availableTimes.length === 0 && (
                // Tom lista är ett giltigt sökresultat (inte API-fel): betyder fullbokat för vald dag.
                <p className="text-gray-500 mt-2">Inga tillgängliga tider</p>
            )}

            {state.availableTimes.length > 0 && (
                <div className="mt-4">
                    <p className="text-green-500 mb-2">Tillgängliga tider:</p>
                    <ul className="space-y-2">
                        {state.availableTimes.map((time) => (
                            <li key={time}>
                                <label className="flex items-center justify-between border rounded-md px-3 py-2">
                                    <span>{time}</span>
                                    <input type="radio" name="time" value={time} onChange={() => {
                                        dispatch({ type: 'SELECT_TIME', payload: time });
                                    }} />
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
   
                }
  

