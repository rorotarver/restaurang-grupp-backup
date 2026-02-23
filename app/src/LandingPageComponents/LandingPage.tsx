"use client"

import About from "./About"
import Contact from "./Contanct"
import Footer from "./Footer"
import Hero from "./Hero"
import Navbar from "./Navbar"

export const LandingPage = () => {
    return (
        <div>
             <Navbar />
             <Hero />
             <About />
             <Contact />
             <Footer />
        </div>

    )
}

export default LandingPage