import { Card, CardContent, Typography } from "@mui/material";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";

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
          <div className="flex justify-center bg-tertiary py-5">
            <div className="bg-white border-2 border-secondary w-[200px] py-6 flex justify-center flex-col items-center">
              <div className="w-[150px] h-[150px] border-2 border-secondary rounded-full">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={user?.photoURL}
                  alt="member photo"
                />
              </div>
              <Typography className="text-tertiary text-xl pt-2 pb-1">
                {user?.displayName}
              </Typography>
              <Typography className="text-tertiary text-base">
                {user?.email}
              </Typography>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 py-10">
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
                    Status: ${agreement?.status}
                  </Typography>
                  <Typography variant="body2">
                    Request Date: {agreement?.date}
                  </Typography>

                  <Typography variant="body2">
                    Confirmation Date: ${agreement?.confirmationDate}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MemberProfile;
