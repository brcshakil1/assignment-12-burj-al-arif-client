import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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
import useAuth from "./../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Apartments = () => {
  const axiosPublic = useAxiosPublic();
  // floor number
  const [floor, setFloor] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 6;
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: apartments = [], isPending } = useQuery({
    queryKey: ["apartments", page, floor],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/apartments?floorNo=${floor}&page=${page}&limit=${limit}`
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

  const handleAgreement = async (apartment) => {
    if (!user) {
      return navigate("/signIn");
    }
    console.log(apartment);
    const agreementInfo = {
      userName: user?.displayName,
      userEmail: user?.email,
      floorNo: apartment?.floorNo,
      blockName: apartment?.blockName,
      apartmentNo: apartment?.apartmentNo,
      rent: apartment?.rent,
      date: new Date().toDateString(),
      status: "pending",
    };
    const { data } = await axiosPublic.post("/agreements", agreementInfo);
    console.log(data);
    if (data.insertedId) {
      toast.success(
        "You've successfully done agreement. Wait for the confirmation. Thank You!"
      );
    }
  };

  console.log(floor);

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
        <div className="pb-5">
          <FormControl className="w-28">
            <InputLabel id="demo-simple-select-label">
              Filter by floor
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={floor}
              label="Floor Number"
              onChange={(e) => setFloor(e.target.value)}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
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
                  onClick={() => handleAgreement(apartment)}
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
