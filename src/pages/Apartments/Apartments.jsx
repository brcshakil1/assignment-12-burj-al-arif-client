import { Container } from "@mui/material";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const Apartments = () => {
  return (
    <Container maxWidth="xl">
      <div>
        <div className="py-10">
          <SectionTitle
            title="Apartments"
            justify="justify-center"
          ></SectionTitle>
        </div>
      </div>
    </Container>
  );
};

export default Apartments;
