import axiosSecure from ".";

// save user data in database
export const saveUser = async (user) => {
  const currentUser = {
    name: user?.displayName,
    email: user?.email,
    role: "user",
    status: "Verified",
  };

  const { data } = axiosSecure.put(`/users/${user?.email}`, currentUser);

  return data;
};

// get token from server

export const getToken = async (email) => {
  const { data } = await axiosSecure.post(`/jwt`, { email });
  console.log("token received from server -------->", data);
  return data;
};
