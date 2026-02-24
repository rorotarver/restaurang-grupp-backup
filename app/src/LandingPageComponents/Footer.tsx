"use client";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center py-6">
            © {new Date().getFullYear()} Bella Vista. Alla rättigheter förbehållna.
        </footer>
    );
};

export default Footer;