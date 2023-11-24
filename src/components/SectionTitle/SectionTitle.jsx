import { PropTypes } from "prop-types";

const SectionTitle = ({ title, justify }) => {
  return (
    <div className={`flex ${justify} `}>
      <div className=" flex-shrink-0">
        <h2 className="md:text-4xl text-3xl font-semibold text-secondary pb-1">
          {title}
        </h2>
        <div className="w-10 h-[2px] bg-secondary"></div>
      </div>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
  justify: PropTypes.string,
};

export default SectionTitle;
