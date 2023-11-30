import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: memberAgreement, isPending } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements`);
      const filterByMember = res?.data?.filter(
        (member) => member?.userEmail === user?.email
      );
      return filterByMember;
    },
  });

  return (
    <div>
      {isPending ? (
        <Loading />
      ) : (
        <>
          {" "}
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
              {memberAgreement?.length ? (
                <div>
                  <h3 className="text-xl font-semibold text-secondary pt-10 pb-5 underline">
                    Your Agreements
                  </h3>
                  <div className="grid grid-cols-1 md:md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {memberAgreement?.map((agreement) => (
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
                            Rent: ${agreement?.rent}
                          </Typography>

                          <Typography variant="body2">
                            Status: {agreement?.status}
                          </Typography>
                          <Typography variant="body2">
                            Request Date: {agreement?.date}
                          </Typography>

                          <Typography variant="body2">
                            Confirmation Date:{" "}
                            {agreement?.confirmationDate || "None"}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="">
                  <h3 className="text-xl font-semibold text-center">
                    There is no agreement!
                  </h3>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberProfile;
