import Footer from "../components/MainFooter/Footer";
import Navbar from "../components/MainNavBar/Navbar";
import ServiceHero from "../components/Services/ServiceHero/ServiceHero";
import ServicesContent from "../components/Services/ServiceContent/ServicesContent";
function Service () {
    return(
        <>
          <Navbar />
           <ServiceHero/>
          <ServicesContent/>
          <Footer/>
        </>
    )

}

export default Service;