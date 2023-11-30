import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCoupons = () => {
  const axiosPublic = useAxiosPublic();
  const { data: coupons, isPending: isCouponPending } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosPublic.get("/coupons");
      return res.data;
    },
  });

  return [coupons, isCouponPending];
};

export default useCoupons;
