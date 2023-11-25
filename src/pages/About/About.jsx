import { Container } from "@mui/material";
import SectionTitle from "./../../components/SectionTitle/SectionTitle";
import aboutImg from "../../assets/building-images/banner-image-1.jpg";
import AboutContentCard from "./AboutContentCard/AboutContentCard";
const About = () => {
  return (
    <Container maxWidth="xl">
      <div>
        <div className="rounded-md border overflow-hidden w-full h-auto md:h-[70vh] mt-4">
          <img
            className=" object-cover w-full h-full bg-center  "
            src={aboutImg}
            alt="Burj Al Arif"
          />
        </div>
        <div className="py-12 md:py-20">
          <SectionTitle title="About burj al arif" justify="justify-center" />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-14 pt-8">
            <AboutContentCard
              title="Architectural Grandeur:"
              content="Immerse yourself in the 
              timeless elegance of Burj Al Arif's
               architecture. Designed to captivate, our
                building stands as a testament to the harmonious
                 fusion of modern aesthetics and classical sophistication."
            />
            <AboutContentCard
              title="Luxurious Amenities:"
              content="Indulge in a lifestyle of 
              unmatched comfort with our array of 
              luxurious amenities. From a 
              state-of-the-art fitness 
              center to serene rooftop gardens, 
              every aspect is crafted to elevate your 
              living experience."
            />
            <AboutContentCard
              title="Spacious Apartments:"
              content="With each floor housing five 
              meticulously designed apartments, 
              Burj Al Arif offers a harmonious 
              blend of space, style, and functionality.
               Discover living spaces that cater
                to the most discerning tastes."
            />
            <AboutContentCard
              title="Prime Location:"
              content="Nestled in the heart of Gulshan,
               Burj Al Arif stands as a beacon of
                elegance amidst a vibrant community.
                 Enjoy the convenience of being in 
                 close proximity to upscale shopping 
                 centers, renowned restaurants, 
                 and cultural attractions."
            />
            <AboutContentCard
              title="Security and Privacy:"
              content="Your safety and privacy are paramount.
              Burj Al Arif is equipped with advanced
                security features to ensure a secure and 
                tranquil living environment for our esteemed
                 residents."
            />
            <AboutContentCard
              title="Commitment to Sustainability:"
              content="At Burj Al Arif, we embrace a commitment 
              to sustainability. From eco-friendly initiatives
               within the building to contributing to a 
               greener community, we strive to create a 
               responsible and environmentally conscious living space."
            />
          </div>
          <p className="text-tertiary  text-left py-5">
            Discover the essence of refined living at Burj Al Arif, where every
            detail is thoughtfully curated to offer a lifestyle beyond
            expectations.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default About;
