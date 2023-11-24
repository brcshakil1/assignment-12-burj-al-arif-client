import { Container } from "@mui/material";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <Container maxWidth="xl">
      <div className="bg-secondary px-8"></div>
    </Container>
  );
};

export default Login;
