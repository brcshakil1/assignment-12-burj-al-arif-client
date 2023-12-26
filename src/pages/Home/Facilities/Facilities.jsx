import pool from "../../../assets/others/pool.jpg";
import parking from "../../../assets/others/parking.jpg";
import fitness from "../../../assets/others/fitness.jpg";
import cat from "../../../assets/others/cat.jpg";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Facilities = () => {
  const { data: facilities } = useQuery({
    queryKey: ["facilities"],
    queryFn: async () => {
      const res = await axios("./facilities.json");
      return res.data;
    },
  });
  return (
    <div className="bg-tertiary my-20 py-5 md:py-14">
      <div className=" md:hidden grid gap-1">
        <img
          className="w-full h-[100px] md:h-[200px] object-cover transition-all duration-300 ease-linear hover:scale-105"
          src={pool}
          alt="swimming pool"
        />
        <img
          className="w-full h-[80px] md:h-[200px] object-cover transition-all duration-300 ease-linear hover:scale-105"
          src={cat}
          alt="cat"
        />
        <img
          className="w-full h-[80px] md:h-[200px] object-cover transition-all duration-300 ease-linear hover:scale-105"
          src={parking}
          alt="parking"
        />
        <img
          className="w-full h-[80px] md:h-[200px] object-cover transition-all duration-300 ease-linear hover:scale-105"
          src={fitness}
          alt="fitness"
        />
      </div>
      <Container
        className="flex flex-col md:flex-row-reverse items-center gap-5 mt-7"
        maxWidth="xl"
      >
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:flex-1">
          <img
            className="w-full h-[80px] md:h-[200px] object-cover transition-all duration-300 ease-linear hover:scale-105"
            src={pool}
            alt="swimming pool"
          />
          <img
            className="w-full h-[80px] md:h-[200px] object-cover transition-all duration-300 ease-linear hover:scale-105"
            src={cat}
            alt="cat"
          />
          <img
            className="w-full h-[80px] md:h-[200px] object-cover transition-all duration-300 ease-linear hover:scale-105"
            src={parking}
            alt="parking"
          />
          <img
            className="w-full h-[80px] md:h-[200px] object-cover transition-all duration-300 ease-linear hover:scale-105"
            src={fitness}
            alt="fitness"
          />
        </div>
        <div className="flex-1 text-primary">
          {facilities?.map((facility) => (
            <div key={facility?.name} className="my-5">
              <h3 className="text-2xl font-bold mt-2">{facility?.name}</h3>
              <p>{facility?.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Facilities;
