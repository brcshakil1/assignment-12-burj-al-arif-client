import { Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Container maxWidth="xl">
      <div className="bg-secondary text-primary py-12 px-5 md:py-20">
        <h2 className="text-xl md:text-2xl font-lora font-semibold text-center">
          BURJ AL ARIF
        </h2>
        <div className="py-4 flex gap-4 justify-center">
          <a href="#">
            <FacebookIcon sx={{ fontSize: "40px" }} />
          </a>
          <a href="#">
            <InstagramIcon sx={{ fontSize: "40px" }} />
          </a>
          <a href="#">
            <LinkedInIcon sx={{ fontSize: "40px" }} />
          </a>
        </div>
        <p className="text-center text-[#9da582] rounded-md">
          <small>
            Copyright © {new Date().getFullYear()} - All right reserved
          </small>
        </p>
      </div>
    </Container>
  );
};

export default Footer;
