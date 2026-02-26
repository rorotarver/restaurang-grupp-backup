import Link from "next/link";

import bakgrund from "../styles/Bilder/Bakgrund.jpg";
import mat2 from "../styles/Bilder/mat2.jpeg";
import mat3 from "../styles/Bilder/mat3.jpg";
import persiskMat1 from "../styles/Bilder/Persiskmat1.jpg";

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <header
        className="landing-hero"
        style={{ backgroundImage: `url(${bakgrund.src})` }}
      >
        <div className="hero-content">
          <h1>Fantastic Four</h1>
          <p className="tagline">
            Upplev autentiska persiska rätter i en varm och välkomnande miljö.
          </p>
          <Link href="/booking" className="hero-btn-boka">
            Boka bord
          </Link>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-section landing-gallery-section">
          <h2>Våra rätter</h2>
          <div className="landing-gallery">
            <img src={mat2.src} alt="Persisk maträtt" />
            <img src={mat3.src} alt="Persisk maträtt" />
            <img src={persiskMat1.src} alt="Persisk maträtt" />
          </div>
        </section>

        <section className="landing-section landing-hours landing-hours-compact">
          <h2>Öppettider</h2>
          <ul>
            <li>
              <span className="day">Måndag</span>{" "}
              <span className="hours">11:00 – 22:00</span>
            </li>
            <li>
              <span className="day">Tisdag</span>{" "}
              <span className="hours">11:00 – 22:00</span>
            </li>
            <li>
              <span className="day">Onsdag</span>{" "}
              <span className="hours">11:00 – 22:00</span>
            </li>
            <li>
              <span className="day">Torsdag</span>{" "}
              <span className="hours">11:00 – 23:00</span>
            </li>
            <li>
              <span className="day">Fredag</span>{" "}
              <span className="hours">11:00 – 23:00</span>
            </li>
            <li>
              <span className="day">Lördag</span>{" "}
              <span className="hours">12:00 – 23:00</span>
            </li>
            <li>
              <span className="day">Söndag</span>{" "}
              <span className="hours">12:00 – 21:00</span>
            </li>
          </ul>
        </section>

        <section className="landing-section">
          <h2>Kontakta oss</h2>
          <form className="landing-form" action="#" method="post">
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
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-block">
            <h3>Adress</h3>
            <address>
              Fantastic Street 123<br />
              12345 Stockholm
            </address>
          </div>
          <div className="footer-block">
            <h3>Telefon</h3>
            <a href="tel:+4681234567">08-123 45 67</a>
          </div>
          <div className="footer-block">
            <h3>E-post</h3>
            <a href="mailto:info@fantasticfour.se">info@fantasticfour.se</a>
          </div>
          <div className="footer-block">
            <h3>Hitta oss</h3>
            <a
              href="https://www.google.com/maps/search/restaurang+Stockholm/@59.3293235,18.0685807,12z"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-btn"
            >
              Visa på karta
            </a>
          </div>
        </div>
        <p className="footer-copyright">
          &copy; Fantastic Four. Alla rättigheter förbehållna.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
