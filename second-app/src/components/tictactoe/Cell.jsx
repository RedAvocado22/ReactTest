import PropTypes from "prop-types";

const Cell = ({ value, onClick, className }) => {
  return (
    <div className={`game-cell ${className}`} onClick={onClick}>
      {value}
    </div>
  );
};

Cell.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
};
export default Cell;
