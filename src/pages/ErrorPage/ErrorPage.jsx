import errorImg from "../../assets/error.png";
const ErrorPage = () => {
  return (
    <div className="min-h-screen grid place-items-center">
      <img className="w-[290px] md:w-[550px]" src={errorImg} alt="Error page" />
    </div>
  );
};

export default ErrorPage;
