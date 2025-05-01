import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ className = "", children, glassmorphism = false }) => {
  return (
    <div
      className={`card ${glassmorphism ? "glassmorphism" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  glassmorphism: PropTypes.bool,
};

export default Card;
