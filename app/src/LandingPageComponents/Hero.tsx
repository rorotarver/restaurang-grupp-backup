"use client";

export const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center px-6 py-28 bg-cover bg-center" style={{ backgroundImage: "url('/app/src/img/2Q.png')" }}>
            <div className="bg-black/50 p-10 rounded-2xl">
                <h2 className="text-5xl font-bold text-white mb-6">
                    Autentisk Persisk Mat
                </h2>
                <p className="text-5xl font-bold text-white mb-6">
                  Färska råvaror, traditionella recept och en varm atmosfär.
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-3 round-2xl shadow-lg transition">
                    Boka Här
                </button>
            </div>
        </section>
    );
};

export default Hero;