import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: totalUser, isPending: isUserPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure("/users?role=user");
      return res.data;
    },
  });
  return [totalUser, isUserPending];
};

export default useUser;
