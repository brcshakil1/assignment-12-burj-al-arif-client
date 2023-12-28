import Banner from "./Banner/Banner";
import AboutBuilding from "./AboutBuilding/AboutBuilding";
import ContactUs from "./ContactUs/ContactUs";
import Reviews from "./Reviews/Reviews";
import Facilities from "./Facilities/Facilities";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);
  return (
    <div className="overflow-hidden">
      <div>
        <Banner />
      </div>
      <div data-aos="fade-up">
        <AboutBuilding />
      </div>
      <div data-aos="fade-right">
        <Reviews />
      </div>
      <div data-aos="fade-left">
        <Facilities />
      </div>
      <div data-aos="fade-up-right">
        <ContactUs />
      </div>
    </div>
  );
};

export default Home;
