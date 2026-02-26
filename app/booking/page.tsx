import BookingFlow from "../src/components/booking/BookingFlow";
import bakgrund from "../src/styles/Bilder/Bakgrund.jpg";

export default function Booking() {
  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${bakgrund.src})` }}
    >
      <main className="landing-main">
        <section
          className="landing-section"
          style={{ maxWidth: "640px", margin: "1.5rem auto" }}
        >
          <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <BookingFlow />
          </div>
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
        <p className="footeropyright">
          &copy; Fantastic Four. Alla rättigheter förbehållna.
        </p>
      </footer>
    </div>
  );
}