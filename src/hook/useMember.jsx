import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useMember = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: isMember, isPending: isMemberPending } = useQuery({
    queryKey: [user?.email, "isMember"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      console.log(res.data);
      return res.data.member;
    },
  });
  return [isMember, isMemberPending];
};

export default useMember;
