import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hook/useAuth";
import SectionTitle from "./../../../components/SectionTitle/SectionTitle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useUser from "../../../hook/useUser";
import useTotalMember from "../../../hook/useTotalMember";
import PaidIcon from "@mui/icons-material/Paid";
import DomainIcon from "@mui/icons-material/Domain";
import PersonIcon from "@mui/icons-material/Person";
import BeenhereIcon from "@mui/icons-material/Beenhere";

const AdminProfile = () => {
  const { user, loading } = useAuth();
  const [totalUser, isUserPending] = useUser();
  const [totalMember, isMemberPending] = useTotalMember();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: apartments, isPending } = useQuery({
    queryKey: ["Apartments"],
    queryFn: async () => {
      const res = await axiosPublic.get("/apartments");
      return res.data.totalApartments;
    },
  });

  const { data: paymentsHistory, isPaymentLoading } = useQuery({
    queryKey: ["paymentsHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });
  // rented percentage
  const rentedApartment = paymentsHistory?.totalRented || 0;
  const totalApartments = apartments;
  const percentageRented = (rentedApartment / totalApartments) * 100;

  // available apartments percentage;

  const availableApartments = totalApartments - rentedApartment;
  const percentageAvailableApartments =
    (availableApartments / totalApartments) * 100;

  console.log(paymentsHistory);

  return (
    <div className="">
      {loading ||
      isPending ||
      isPaymentLoading ||
      isUserPending ||
      isMemberPending ? (
        <Loading />
      ) : (
        <div>
          <SectionTitle title="Profile" justify="justify-center" />
          {/* profile */}
          <div className="flex gap-10 flex-col md:flex-row justify-center items-center py-10">
            <div>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ maxHeight: "350px", objectFit: "cover" }}
                    height="140"
                    image={user?.photoURL}
                    alt="Admin Profile"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      className="text-secondary"
                      component="div"
                    >
                      {user?.displayName}
                    </Typography>
                    <Typography
                      className="text-tertiary"
                      variant="body2"
                      color="text.secondary"
                    >
                      {user?.email}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Card sx={{ minWidth: 275 }}>
                <CardContent className="text-center">
                  <ApartmentIcon />
                  <Typography variant="h5" component="div">
                    Total Apartments
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {apartments}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 275 }}>
                <CardContent className="text-center">
                  <DomainIcon />
                  <Typography variant="h5" component="div">
                    Available Apartment
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {percentageAvailableApartments.toFixed(2)}%
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 275 }}>
                <CardContent className="text-center">
                  <PaidIcon />
                  <Typography variant="h5" component="div">
                    Rented Percentage
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {percentageRented.toFixed(2)}%
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 275 }}>
                <CardContent className="text-center">
                  <PersonIcon />
                  <Typography variant="h5" component="div">
                    Users
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {totalUser?.length}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 275 }}>
                <CardContent className="text-center">
                  <BeenhereIcon />
                  <Typography variant="h5" component="div">
                    Members
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {totalMember?.length}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
