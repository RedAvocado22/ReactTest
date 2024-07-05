import PropTypes from "prop-types";

const LoadingSkeleton = (props) => {
  return (
    <div
      className="skeleton"
      style={{
        height: props.height,
        width: props.width || "100%",
        borderRadius: props.radius,
      }}
    ></div>
  );
};

LoadingSkeleton.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  radius: PropTypes.string,
};
export default LoadingSkeleton;
