import { Container } from "@mui/material";
import mapImg from "../../../assets/map/burj-al-arif-map.png";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const ContactUs = () => {
  return (
    <Container maxWidth="xl">
      <div className=" pb-12 md:pb-20">
        <div className="pb-7">
          <SectionTitle
            title="Our Apartment's Location"
            justify="justify-center"
          />
          <p className="text-tertiary pt-3 text-center">
            Welcome to our luxury apartments nestled in the heart of Gulshan,
            Dhaka. Explore the vibrant neighborhood and find ease in reaching
            our location.
          </p>
        </div>
        <div className="flex justify-center ">
          <img
            className="w-full h-auto md:w-[700px] md:h-[300px] object-cover border-4 border-secondary rounded-xl"
            src={mapImg}
            alt="location of Burj Al Arif"
          />
        </div>
        <div className="flex justify-between gap-10 flex-col md:flex-row pt-8">
          <div>
            <h3 className="text-xl text-secondary font-semibold pb-3">
              Location Overview:
            </h3>
            <p className="text-tertiary pb-4">
              Our apartments are situated in the prestigious Gulshan area, known
              for its upscale ambiance and urban charm. Immerse yourself in the
              dynamic energy of Gulshan, surrounded by high-end shopping,
              exquisite dining, and cultural attractions.
            </p>
            <address className="text-tertiary leading-7">
              <span className="font-semibold text-secondary ">
                BURJ AL ARIF
              </span>{" "}
              <br />
              149-146 Rd No 13B, Dhaka 1212 <br />
              Gulshan, Dhaka <br />
              Bangladesh <br />
              Coordinates: <br />
              Latitude: 23.7925 <br />
              Longitude: 90.4078
            </address>
          </div>
          <div>
            <div>
              <h3 className="text-xl text-secondary font-semibold pb-3">
                Directions:
              </h3>
              <div className="text-tertiary pb-4">
                <p className="font-semibold text-secondary pb-2">By Car:</p>
                <p>
                  If you{`'`}re coming from the central business district, head
                  northeast on 86 Road No. 8, Dhaka 1213 towards Gulshan. Take
                  the Road 62, Gulshan 2 and continue until you reach the
                  Landmark. Our apartments will be on your Left.
                </p>
              </div>
              <div className="text-tertiary ">
                <p className="font-semibold text-secondary pb-2">
                  By Public Transport:
                </p>
                <p>
                  Accessible by various modes of public transport, including
                  buses and rideshares. <br />
                  Nearest public transport stop: Gulshan 2 Bus Stop
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
