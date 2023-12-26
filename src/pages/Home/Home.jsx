import Banner from "./Banner/Banner";
import AboutBuilding from "./AboutBuilding/AboutBuilding";
import ContactUs from "./ContactUs/ContactUs";
import Reviews from "./Reviews/Reviews";
import Facilities from "./Facilities/Facilities";

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutBuilding />
      <Reviews />
      <Facilities />
      <ContactUs />
    </div>
  );
};

export default Home;
