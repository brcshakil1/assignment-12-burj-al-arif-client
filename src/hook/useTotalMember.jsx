import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTotalMember = () => {
  const axiosSecure = useAxiosSecure();
  const { data: totalMember, isPending: isMemberPending } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure("/users?role=member");
      return res.data;
    },
  });
  return [totalMember, isMemberPending];
};

export default useTotalMember;
