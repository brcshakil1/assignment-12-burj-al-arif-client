import { Container } from "@mui/material";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import apartmentImg from "../../assets/apartment-images/apartments.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hook/useAxiosPublic";

const Apartments = () => {
  const axiosPublic = useAxiosPublic();

  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosPublic.get("/apartments");
      return res.data;
    },
  });

  console.log(apartments);

  return (
    <Container maxWidth="xl">
      <div>
        <div
          className="h-[40vh]  md:h-[60vh]  w-full mt-4 bg-cover md:bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${apartmentImg})` }}
        ></div>
        <div className="py-10">
          <SectionTitle
            title="Apartments"
            justify="justify-center"
          ></SectionTitle>
        </div>
        <div>
          {apartments?.map((apartment) => (
            <Card key={apartment._id} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={apartment?.imageSrc}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Apartments;
