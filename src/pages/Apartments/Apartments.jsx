import { Box, Button, CircularProgress, Container } from "@mui/material";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import apartmentImg from "../../assets/apartment-images/apartments.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";

const Apartments = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: apartments = [], isPending } = useQuery({
    queryKey: ["apartments", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/apartments?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="min-h-[90vh] grid place-items-center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress className="text-secondary" />
        </Box>
      </div>
    );
  }

  const totalPage = Math.ceil(apartments?.totalApartments / limit);

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
        <div className="grid grid-cols-1 md:md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apartments?.result?.map((apartment) => (
            <Card key={apartment?._id}>
              <CardMedia
                className="h-[200px] md:h-[250px]"
                component="img"
                image={apartment?.imageSrc}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  className="text-secondary"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {apartment?.name}
                </Typography>
                <Typography
                  className="text-secondary"
                  variant="body2"
                  color="text.secondary"
                >
                  Floor No: {apartment?.floorNo}
                </Typography>
                <Typography
                  className="text-secondary"
                  variant="body2"
                  color="text.secondary"
                >
                  Block Name: {apartment?.blockName}
                </Typography>
                <Typography
                  className="text-secondary"
                  variant="body2"
                  color="text.secondary"
                >
                  Apartment No: {apartment?.apartmentNo}
                </Typography>
                <Typography
                  className="text-secondary"
                  variant="body2"
                  color="text.secondary"
                >
                  Rent Per Month: ${apartment?.rent}
                </Typography>

                <Button
                  className="bg-tertiary  font-poppins mt-4"
                  variant="contained"
                >
                  Agreement{" "}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center py-10">
          <Pagination
            onChange={(e) => {
              setPage(parseInt(e.target.textContent));
            }}
            count={totalPage}
            color="primary"
            variant="outlined"
            hidePrevButton
            hideNextButton
          />
        </div>
      </div>
    </Container>
  );
};

export default Apartments;
