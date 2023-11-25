import { PropTypes } from "prop-types";
const AboutContentCard = ({ title, content }) => {
  return (
    <div className="border-b border-secondary space-y-2">
      <h3 className="text-secondary text-xl font-semibold font-poppins">
        {title}
      </h3>
      <p className="text-tertiary py-2">{content}</p>
    </div>
  );
};

AboutContentCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default AboutContentCard;
