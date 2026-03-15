
import Footer from "../components/MainFooter/Footer";
import Hero from "../components/Home/Hero/Hero";
import HowItWorks from "../components/Home/HowItWorks/HowItWorks";
import IntroSection from "../components/Home/Intro/IntroSection";
import Navbar from "../components/MainNavbar/Navbar";
import Note from "../components/Home/Note/Note";
import StartJourney from "../components/Home/StartJourney/StartJourney";
import WhyChoose from "../components/Home/WhyChoose/WhyChoose";


function Home () {
    return(
        <>
        <Navbar />
        <Hero />
        <IntroSection/>
        <WhyChoose/>
        <HowItWorks/>
        <Note/>
        <StartJourney/>
        <Footer/>


</>

        
    )

}

export default Home;