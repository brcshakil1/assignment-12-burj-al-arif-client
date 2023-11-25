import { Container } from "@mui/material";
import { PropTypes } from "prop-types";

const SectionTitle = ({ title, justify }) => {
  return (
    <Container maxWidth="xl">
      <div className={`flex ${justify} `}>
        <div className=" flex-shrink-0">
          <h2 className="md:text-4xl text-xl font-lora font-semibold text-secondary pb-1 uppercase">
            {title}
          </h2>
          <div className="w-14 h-[2px] bg-secondary"></div>
        </div>
      </div>
    </Container>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
  justify: PropTypes.string,
};

export default SectionTitle;
