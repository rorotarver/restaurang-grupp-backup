"use client";

import { FormEvent, useState } from "react";
import bakgrund from "../src/styles/Bilder/Bakgrund.jpg";
import Link from "next/link";

export default function ContactPage() {
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.currentTarget.reset();
		setSuccessMessage("Tack! Ditt meddelande har skickats.");
	};

	return (
		<div
			className="landing-page"
			style={{ backgroundImage: `url(${bakgrund.src})` }}
		>
			<main className="landing-main">
				<section className="landing-section" style={{ maxWidth: "820px", margin: "1.25rem auto" }}>
					<Link href="/" className="landing-btn" style={{ marginBottom: "1rem" }}>
						Till startsidan
					</Link>
					<h1>Kontakta oss</h1>
					<p className="tagline">
						Har du frågor om bokning, allergier eller större sällskap? Hör av dig så hjälper vi dig gärna.
					</p>

					<section className="landing-section" style={{ marginTop: "1rem" }}>
						<h2>Skicka meddelande</h2>
						<form className="landing-form" onSubmit={handleSubmit}>
							<label htmlFor="name">Namn</label>
							<input type="text" id="name" name="name" required />

							<label htmlFor="phone">Telefon</label>
							<input type="tel" id="phone" name="phone" required />

							<label htmlFor="email">E-post</label>
							<input type="email" id="email" name="email" required />

							<label htmlFor="message">Meddelande</label>
							<textarea id="message" name="message" rows={5} required />

							<button type="submit" className="landing-btn-submit">
								Skicka
							</button>
						</form>
						{successMessage && <p className="text-green-600 mt-3">{successMessage}</p>}
					</section>

					<div className="landing-info-grid" style={{ marginTop: "1.5rem" }}>
						<div className="landing-info-block">
							<h2>Telefon</h2>
							<a href="tel:+4681234567">08-123 45 67</a>
						</div>
						<div className="landing-info-block">
							<h2>E-post</h2>
							<a href="mailto:info@fantasticfour.se">info@fantasticfour.se</a>
						</div>
						<div className="landing-info-block">
							<h2>Adress</h2>
							<address>
								Fantastic Street 123
								<br />
								12345 Stockholm
							</address>
						</div>
					</div>
				</section>
			</main>

			<footer className="landing-footer">
				<p className="footer-copyright">
					&copy; Fantastic Four. Alla rättigheter förbehållna.
				</p>
			</footer>
		</div>
	);
}
