import { Booking } from '../../types/booking.types';
import { Button } from '../ui/Button';

type Props = {
	bookings: Booking[];
	onEdit: (booking: Booking) => void;
	onDelete: (bookingId: string) => void;
	loading?: boolean;
};

export const BookingList = ({ bookings, onEdit, onDelete, loading }: Props) => {
	return (
		<section className="card">
			<h2>Bokningar</h2>
			{bookings.length === 0 ? <p>Inga bokningar hittades.</p> : null}
			<ul className="booking-list">
				{bookings.map((booking) => (
					<li key={booking.id} className="booking-item">
						<div>
							<p>
								<strong>{booking.customer.lastname}</strong>
							</p>
							<p>
								{booking.date} kl {booking.time} · {booking.numberOfGuests} gäster
							</p>
							<p>{booking.customer.email}</p>
						</div>
						<div className="row gap-sm">
							<Button type="button" className="btn-secondary" onClick={() => onEdit(booking)}>
								Redigera
							</Button>
							<Button
								type="button"
								className="btn-danger"
								onClick={() => onDelete(booking.id)}
								disabled={loading}
							>
								Avboka
							</Button>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};
