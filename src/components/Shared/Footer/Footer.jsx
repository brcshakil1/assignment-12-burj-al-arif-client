import { Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../../../assets/logo-footer.png";

const Footer = () => {
  return (
    <Container maxWidth="xl">
      <div className="bg-secondary text-primary py-12 px-5 md:py-20">
        <div className="flex justify-center flex-col items-center">
          <img src={logo} className="w-[80px] " alt="Burj Al Arif" />
          <div className="py-4 gap-4">
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
      </div>
    </Container>
  );
};

export default Footer;
