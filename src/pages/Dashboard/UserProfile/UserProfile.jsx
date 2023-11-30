import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hook/useAuth";

const UserProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="flex justify-center md:justify-start gap-10 items-center flex-col md:flex-row py-5">
        <div className="">
          <div className="pb-5">
            <SectionTitle title="Profile" />
          </div>
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
        <div>
          <div>
            <h3 className="text-xl font-semibold text-secondary pt-10 pb-5 underline">
              Your Agreements
            </h3>
            <div className="grid grid-cols-1 md:md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {user?.displayName}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {user?.email}
                  </Typography>
                  <Typography variant="body2">Floor No: None</Typography>
                  <Typography variant="body2">Block Name: None</Typography>
                  <Typography variant="body2">Apartment No: None</Typography>
                  <Typography variant="body2">Rent: None</Typography>

                  <Typography variant="body2">Status: None</Typography>
                  <Typography variant="body2">Request Date: None</Typography>

                  <Typography variant="body2">
                    Confirmation Date: None
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
