import { Button } from "@mui/material";
import loginBg from "../../assets/building-images/banner-image-2.jpg";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { saveUser } from "../../api/auth";

const SignIn = () => {
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const { signInUser, signInWithGoogle, loading } = useAuth();

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;
    try {
      // User registration
      const result = await signInUser(email, pass);
      if (result) {
        navigate("/");
        toast.success("User sign in successfully!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // User registration using google
      const result = await signInWithGoogle();

      // Save user data in Database
      const dbResponse = await saveUser(result?.user);
      console.log(dbResponse, "user created");

      navigate("/");
      toast.success("Sign in successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-[#000000b3] bg-blend-overlay px-5"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="relative">
        <div className=" mx-auto md:w-[600px] py-20 text-primary">
          <h2 className="text-4xl font-semibold">Sign in</h2>
          <Button
            onClick={handleGoogleSignIn}
            className="my-5 text-primary gap-4 cursor-pointer w-full flex justify-center items-center border-2 border-primary rounded-full py-4 "
            variant="outlined"
          >
            {" "}
            {loading ? (
              <ImSpinner9 className="animate-spin text-primary" />
            ) : (
              <>
                <GoogleIcon />{" "}
                <span className="text-lg font-medium">Sign in with google</span>
              </>
            )}
          </Button>

          <div className="flex justify-center items-center gap-4 pb-5">
            <div className="w-full h-[1px] bg-primary" />
            <div className="flex-1 text-xl">or</div>
            <div className="w-full h-[1px] bg-primary" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
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
              Are you new here?{" "}
              <Link
                to="/signUp"
                className="text-blue-600 font-medium hover:text-blue-300"
              >
                Sign up
              </Link>
            </p>
            <div className="">
              <Button
                type="submit"
                className="bg-tertiary w-full py-4 text-primary rounded-full text-lg font-medium"
                variant="contained"
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin text-primary" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
