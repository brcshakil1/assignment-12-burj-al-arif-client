import { Button, Container } from "@mui/material";
import SectionTitle from "./../../../components/SectionTitle/SectionTitle";
import buildingImg from "../../../assets/building-images/about-building.jpg";
import { Link } from "react-router-dom";
const AboutBuilding = () => {
  return (
    <Container maxWidth="xl">
      <div className="py-20">
        <SectionTitle title="about burj al arif" justify="justify-center" />
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 py-8">
          <div className="space-y-3">
            <h3 className="text-xl text-secondary font-semibold">
              Welcome to Burj Al Arif
            </h3>
            <p className="text-tertiary ">
              An epitome of luxury living in the prestigious Gulshan
              neighborhood of Dhaka. Our 10-story architectural masterpiece is
              meticulously designed to redefine opulence and provide an
              unparalleled residential experience.
            </p>
            <Link to="/about">
              <Button
                className="bg-tertiary font-semibold mt-3"
                variant="contained"
              >
                Read More
              </Button>
            </Link>
          </div>
          <div className="bg-secondary rounded-xl flex justify-center overflow-hidden">
            <img className="w-[92%] " src={buildingImg} alt="Burj Al Arif" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutBuilding;
