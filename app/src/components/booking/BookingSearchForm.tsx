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

type AvailableSlot = {
    date: string;
    time: string;
};

// Bokningsflödets UI-state: sökinput, async-status och resultat av tillgängliga tider.
type State = {   
    date: string;
    week: string;
    numberOfGuests: number;
    selectionError: string | null;
    availableSlots: AvailableSlot[];
    selectedSlotKey: string | null;
    isLoading: boolean;
    error: string | null;                 
    hasSearched: boolean;
};

// Actions beskriver alla tillåtna state-övergångar i formulärflödet (input -> sök -> resultat/fel).
type Action =                                      
    | { type: 'SET_DATE'; payload: string }
    | { type: 'SET_WEEK'; payload: string }
    | { type: 'SET_NUMBER_OF_GUESTS'; payload: number }
    | { type: 'SET_SELECTION_ERROR'; payload: string }
    | { type: 'CLEAR_SELECTION_ERROR' }
    | { type: 'SEARCH_START' }
    | { type: 'SEARCH_SUCCESS'; payload: AvailableSlot[] }
    | { type: 'SEARCH_FAILURE'; payload: string }
    | { type: 'SELECT_SLOT'; payload: string }
    | { type: 'RESET_SEARCH' };

const initialState: State = {     // Initialt state för komponenten innan användaren har gjort någon interaktion
    date: '',
    week: '',
    numberOfGuests: 1,
    selectionError: null,
    availableSlots: [],
    selectedSlotKey: null,
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
            return { ...state, date: action.payload, week: '', selectionError: null, selectedSlotKey: null, availableSlots: [], hasSearched: false };
        case 'SET_WEEK':
            return { ...state, week: action.payload, date: '', selectionError: null, selectedSlotKey: null, availableSlots: [], hasSearched: false };
        case 'SET_NUMBER_OF_GUESTS':
            return { ...state, numberOfGuests: action.payload, selectionError: null, selectedSlotKey: null, availableSlots: [], hasSearched: false };
        case 'SET_SELECTION_ERROR':
            return { ...state, selectionError: action.payload };
        case 'CLEAR_SELECTION_ERROR':
            return { ...state, selectionError: null };
        case 'SEARCH_START':
            return { ...state, isLoading: true, error: null, selectionError: null, availableSlots: [], selectedSlotKey: null };
        case 'SEARCH_SUCCESS':
            return { ...state, isLoading: false, availableSlots: action.payload, hasSearched: true };
        case 'SEARCH_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        case 'SELECT_SLOT':
            return { ...state, selectedSlotKey: action.payload, selectionError: null };
        case 'RESET_SEARCH':
            return initialState;
        default:
            return state;
    }
};

const toIsoDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const getTodayLocalIsoDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getWeekDates = (week: string): string[] => {
    const match = week.match(/^(\d{4})-W(\d{2})$/);
    if (!match) return [];

    const year = Number(match[1]);
    const weekNumber = Number(match[2]);

    const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
    const firstWeekDay = firstDayOfYear.getUTCDay() || 7;
    const daysToMonday = firstWeekDay - 1;
    const firstMonday = new Date(firstDayOfYear);
    firstMonday.setUTCDate(firstDayOfYear.getUTCDate() - daysToMonday);

    const weekStart = new Date(firstMonday);
    weekStart.setUTCDate(firstMonday.getUTCDate() + (weekNumber - 1) * 7);

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(weekStart);
        date.setUTCDate(weekStart.getUTCDate() + index);
        return toIsoDate(date);
    });
};

export default function BookingSearchForm({ onBookingSlotSelected }: BookingSearchFormProps) {  
    const [state, dispatch] = useReducer(reducer, initialState);  
    const todayIso = getTodayLocalIsoDate();
    let buttonText = 'Sök tider';
    
    if (state.hasSearched && state.availableSlots.length > 0) buttonText = 'Fortsätt';
    
    const handleSearch = async (e: FormEvent) => { 
        e.preventDefault();

        if (state.hasSearched && state.availableSlots.length > 0 && !state.selectedSlotKey) {
            dispatch({ type: 'SET_SELECTION_ERROR', payload: 'Vänligen välj en tid' });
            return;
        }

        if (state.hasSearched && state.selectedSlotKey) {
            const selectedSlot = state.availableSlots.find(
                (slot) => `${slot.date}|${slot.time}` === state.selectedSlotKey,
            );

            if (!selectedSlot) {
                dispatch({ type: 'SET_SELECTION_ERROR', payload: 'Vänligen välj en tid' });
                return;
            }

            onBookingSlotSelected({
                date: selectedSlot.date,
                time: selectedSlot.time,
                numberOfGuests: state.numberOfGuests,
            });
            return;
        }

        if (!state.date && !state.week) {
            dispatch({ type: 'SEARCH_FAILURE', payload: 'Välj antingen datum eller vecka.' });
            return;
        }

        if (state.numberOfGuests < 1 || state.numberOfGuests > 6) {
            dispatch({ type: 'SEARCH_FAILURE', payload: 'Antal gäster måste vara mellan 1 och 6' });
            return;
        }

        if (state.date && state.date < todayIso) {
            dispatch({ type: 'SEARCH_FAILURE', payload: 'Du kan inte boka ett datum som redan har passerat.' });
            return;
        }
        
        dispatch({ type: 'SEARCH_START' });

        try {
            if (!RESTAURANT_ID) {
                dispatch({ type: 'SEARCH_FAILURE', payload: 'Restaurant ID saknas i .env.local' });
                return;
            }
            const bookings = await getBookingsByRestaurant(RESTAURANT_ID);

            const computeSlotsForDate = (date: string): AvailableSlot[] => {
                const sameDate = bookings.filter((b) => b.date === date);
                const bookedAt18 = sameDate.filter((b) => b.time === '18:00').length;
                const bookedAt21 = sameDate.filter((b) => b.time === '21:00').length;

                const slots: AvailableSlot[] = [];
                if (bookedAt18 < 15) slots.push({ date, time: '18:00' });
                if (bookedAt21 < 15) slots.push({ date, time: '21:00' });
                return slots;
            };

            const datesToCheck = (state.date ? [state.date] : getWeekDates(state.week))
                .filter((date) => date >= todayIso);

            if (!state.date && state.week && datesToCheck.length === 0) {
                dispatch({ type: 'SEARCH_FAILURE', payload: 'Vald vecka har inga bokningsbara datum kvar.' });
                return;
            }

            const availableSlots = datesToCheck.flatMap(computeSlotsForDate);

            dispatch({ type: 'SEARCH_SUCCESS', payload: availableSlots });
                
        } catch {
            dispatch({ type: 'SEARCH_FAILURE', payload: 'Ett fel uppstod vid hämtning av bokningar' });
        }
    };

    return (
        <section className="w-full max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-5 p-2 sm:p-4">
                <input type='date' min={todayIso} value={state.date} onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })} className="border rounded-md p-3 w-full" />
                <input type='week' value={state.week} onChange={(e) => dispatch({ type: 'SET_WEEK', payload: e.target.value })} className="border rounded-md p-3 w-full" />
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

            {state.hasSearched && !state.error && state.availableSlots.length === 0 && (
                // Tom lista är ett giltigt sökresultat (inte API-fel): betyder fullbokat för vald dag.
                <p className="text-gray-500 mt-2">Inga tillgängliga tider</p>
            )}

            {state.availableSlots.length > 0 && (
                <div className="mt-4">
                    <p className="text-green-500 mb-2">Tillgängliga tider:</p>
                    <ul className="space-y-2">
                        {state.availableSlots.map((slot) => {
                            const slotKey = `${slot.date}|${slot.time}`;
                            return (
                            <li key={slotKey}>
                                <label className="flex items-center justify-between border rounded-md px-3 py-2">
                                    <span>{slot.date} kl {slot.time}</span>
                                    <input type="radio" name="slot" value={slotKey} checked={state.selectedSlotKey === slotKey} onChange={() => {
                                        dispatch({ type: 'SELECT_SLOT', payload: slotKey });
                                    }} />
                                </label>
                            </li>
                        );})}
                    </ul>
                </div>
            )}
        </section>
    )
   
                }
  

