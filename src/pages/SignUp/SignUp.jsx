import { Button } from "@mui/material";
import loginBg from "../../assets/building-images/banner-image-2.jpg";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import { imageUpload } from "../../api/utils";

const SignUp = () => {
  const [isShow, setIsShow] = useState(false);

  const { createUser } = useAuth();

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const pass = form.password.value;
    const photo = form.photo.files[0];
    const imageData = await imageUpload(photo);
    console.log(imageData);

    const userInfo = {
      name,
      photo,
      email,
      pass,
      role: "user",
    };
    // createUser(email, pass)
    //   .then((result) => console.log(result.user))
    //   .catch((error) => console.log(error.message));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-[#000000b3] bg-blend-overlay px-5"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="relative">
        <div className=" mx-auto md:w-[600px] py-20 text-primary">
          <h2 className="text-4xl font-semibold">Sign Up</h2>
          <Button
            className="my-5 text-primary gap-4 cursor-pointer w-full flex justify-center items-center border-2 border-primary rounded-full py-4 "
            variant="outlined"
          >
            {" "}
            <GoogleIcon />{" "}
            <span className="text-lg font-medium">Sign in with google</span>
          </Button>

          <div className="flex justify-center items-center gap-4 pb-5">
            <div className="w-full h-[1px] bg-primary" />
            <div className="flex-1 text-xl">or</div>
            <div className="w-full h-[1px] bg-primary" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">
                <span className="text-xl">Email</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter Your Full Name"
                className="focus:border-[3px] border-2 text-primary border-primary focus:border-[#f8e565] outline-none py-3 bg-transparent rounded-lg text-xl px-2"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="photo">
                <span className="text-xl">Email</span>
              </label>
              <input
                id="photo"
                type="file"
                name="photo"
                placeholder="Enter Your Email"
                className="focus:border-[3px] border-2 text-primary border-primary focus:border-[#f8e565] outline-none py-3 bg-transparent rounded-lg text-xl px-2"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">
                <span className="text-xl">Email</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="focus:border-[3px] border-2 text-primary border-primary focus:border-[#f8e565] outline-none py-3 bg-transparent rounded-lg text-xl px-2"
              />
            </div>
            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="email">
                <span className="text-xl">Password</span>
              </label>
              <input
                id="password"
                type={`${isShow ? "password" : "text"}`}
                name="password"
                placeholder="Enter Your Password"
                className="focus:border-[3px] border-2 text-primary border-primary focus:border-[#f8e565] outline-none py-3 bg-transparent rounded-lg text-xl px-2"
              />
              <div
                onClick={handleShowPassword}
                className="absolute right-4 bottom-4"
              >
                {isShow ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>
            <p>
              Already have an account?{" "}
              <Link
                className="text-blue-600 font-medium hover:text-blue-300"
                to="/signIn"
              >
                Sign in
              </Link>
            </p>
            <div className="">
              <Button
                type="submit"
                className="bg-tertiary w-full py-4 text-primary rounded-full text-lg font-medium"
                variant="contained"
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
