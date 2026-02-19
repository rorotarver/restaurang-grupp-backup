import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Booking, CustomerFormValues } from '../../types/booking.types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type Props = {
	booking: Booking | null;
	onSave: (input: {
		id?: string;
		date: string;
		time: string;
		numberOfGuests: number;
		customer: CustomerFormValues;
	}) => void;
	onCancelEdit: () => void;
	loading?: boolean;
};

export const BookingEditor = ({ booking, onSave, onCancelEdit, loading }: Props) => {
	const [date, setDate] = useState('');
	const [time, setTime] = useState<'18:00' | '21:00'>('18:00');
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [customer, setCustomer] = useState<CustomerFormValues>({ lastname: '', email: '', phone: '' });
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		if (!booking) {
			setDate('');
			setTime('18:00');
			setNumberOfGuests(1);
			setCustomer({ lastname: '', email: '', phone: '' });
			setSubmitted(false);
			return;
		}

		setDate(booking.date);
		setTime(booking.time === '21:00' ? '21:00' : '18:00');
		setNumberOfGuests(booking.numberOfGuests);
		setCustomer({ ...booking.customer });
		setSubmitted(false);
	}, [booking]);

	const errors = useMemo(() => {
		const next: { date?: string; numberOfGuests?: string; lastname?: string; email?: string; phone?: string } =
			{};
		if (!date) next.date = 'Datum krävs.';
		if (numberOfGuests < 1 || numberOfGuests > 6) next.numberOfGuests = 'Antal gäster måste vara 1-6.';
		if (!customer.lastname.trim()) next.lastname = 'Namn krävs.';
		if (!/^\S+@\S+\.\S+$/.test(customer.email)) next.email = 'Ogiltig e-post.';
		if (!/^\+?[0-9\s-]{7,20}$/.test(customer.phone)) next.phone = 'Ogiltigt telefonnummer.';
		return next;
	}, [customer, date, numberOfGuests]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setSubmitted(true);
		if (Object.keys(errors).length > 0) return;

		onSave({
			id: booking?.id,
			date,
			time,
			numberOfGuests,
			customer,
		});
	};

	return (
		<form className="card" onSubmit={handleSubmit}>
			<h2>{booking ? 'Redigera bokning' : 'Lägg till bokning'}</h2>
			<Input
				label="Datum"
				type="date"
				value={date}
				onChange={(event) => setDate(event.target.value)}
				error={submitted ? errors.date : undefined}
			/>

			<div className="field">
				<label htmlFor="admin-time">Tid</label>
				<select id="admin-time" className="input" value={time} onChange={(event) => setTime(event.target.value as '18:00' | '21:00')}>
					<option value="18:00">18:00</option>
					<option value="21:00">21:00</option>
				</select>
			</div>

			<Input
				label="Antal gäster"
				type="number"
				min={1}
				max={6}
				value={numberOfGuests}
				onChange={(event) => setNumberOfGuests(Number(event.target.value))}
				error={submitted ? errors.numberOfGuests : undefined}
			/>

			<Input
				label="Namn"
				value={customer.lastname}
				onChange={(event) => setCustomer((prev) => ({ ...prev, lastname: event.target.value }))}
				error={submitted ? errors.lastname : undefined}
			/>
			<Input
				label="E-post"
				value={customer.email}
				onChange={(event) => setCustomer((prev) => ({ ...prev, email: event.target.value }))}
				error={submitted ? errors.email : undefined}
			/>
			<Input
				label="Telefon"
				value={customer.phone}
				onChange={(event) => setCustomer((prev) => ({ ...prev, phone: event.target.value }))}
				error={submitted ? errors.phone : undefined}
			/>

			<div className="row gap-sm">
				<Button type="submit" loading={loading}>
					{booking ? 'Spara ändringar' : 'Skapa bokning'}
				</Button>
				{booking ? (
					<Button type="button" className="btn-secondary" onClick={onCancelEdit} disabled={loading}>
						Avbryt
					</Button>
				) : null}
			</div>
		</form>
	);
};
