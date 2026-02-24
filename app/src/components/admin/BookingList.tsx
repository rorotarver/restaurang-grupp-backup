import { AdminBookingResponseType } from "../../types/booking.types";

type Props = {
	bookings: AdminBookingResponseType[];
	onEdit: (booking: AdminBookingResponseType) => void;
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
								<strong>{booking.customerId}</strong>
							</p>
							<p>
								{booking.date} kl {booking.time} · {booking.numberOfGuests} gäster
							</p>
							<p>{booking.customerId}</p>
						</div>
						<div className="row gap-sm">
							<button type="button" className="btn-secondary" onClick={() => onEdit(booking)}>
								Redigera
							</button>
							<button
								type="button"
								className="btn-danger"
								onClick={() => onDelete(booking.id)}
								disabled={loading}
							>
								Avboka
							</button>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};
