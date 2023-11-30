import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://burj-al-arif-server.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
