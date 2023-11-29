import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hook/useAxiosSecure";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";

const AgreementRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: agreements, refetch } = useQuery({
    queryKey: ["agreement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements");
      return res.data;
    },
  });

  const handleAccept = async (agreement) => {
    const acceptedStatus = {
      status: "checked",
      confirmationDate: new Date().toDateString(),
    };

    // accepted request
    const { data } = await axiosSecure.patch(
      `/agreements/${agreement?._id}`,
      acceptedStatus
    );
    if (data.modifiedCount > 0) {
      // update user role
      const updateUserRole = {
        role: "member",
      };
      const res = await axiosSecure.patch(
        `/users/${agreement?.userEmail}`,
        updateUserRole
      );
      if (res.data.modifiedCount > 0) {
        refetch();
      }
      refetch();
      toast.success("Accepted agreement request");
    }
  };

  const handleReject = async (agreement) => {
    const rejectStatus = {
      status: "checked",
      confirmationDate: new Date().toDateString(),
    };
    console.log(agreement);
    // accepted request
    const { data } = await axiosSecure.patch(
      `/agreements/${agreement?._id}`,
      rejectStatus
    );
    if (data.modifiedCount > 0) {
      refetch();
      toast.success("Reject agreement request");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-secondary">
        Agreement Requests: {agreements?.length}
      </h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
        {agreements?.map((agreement) => (
          <Card key={agreement?._id}>
            <CardContent>
              <Typography variant="h5" component="div">
                {agreement?.userName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {agreement?.userEmail}
              </Typography>
              <Typography variant="body2">
                Floor No: {agreement?.floorNo}
              </Typography>
              <Typography variant="body2">
                Block Name: {agreement?.blockName}
              </Typography>
              <Typography variant="body2">
                Apartment No: {agreement?.apartmentNo}
              </Typography>
              <Typography variant="body2">
                Request Date: {agreement?.date}
              </Typography>
              <Typography variant="body2">Rent: ${agreement?.rent}</Typography>
              <Typography variant="body2">
                Status: ${agreement?.status}
              </Typography>
            </CardContent>
            <CardActions>
              {agreement?.status === "pending" && (
                <>
                  <Button
                    onClick={() => handleAccept(agreement)}
                    className="bg-tertiary text-primary font-semibold"
                    variant="contained"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleReject(agreement)}
                    className="bg-tertiary text-primary font-semibold"
                    variant="contained"
                  >
                    Reject
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgreementRequest;
