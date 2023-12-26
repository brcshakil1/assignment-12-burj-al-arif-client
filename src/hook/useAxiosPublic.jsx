import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://burj-al-arif-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
