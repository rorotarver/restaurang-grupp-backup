"use clietn";

export const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-gray shadow-md sticky top-0 z-50">
            <h1 className="text-2xl font-bold">The Restaurant Fantastic Food</h1>
            <div className="space-x-6 hidden md:block">
                <a href="#about" className="hover:text-orange-500">Om oss</a>
                <a href="#contact" className="hover:text-orange-500">Kontakt</a>
            </div>
        </nav>
    );
};

export default Navbar;