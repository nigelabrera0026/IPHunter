/**
 * @author Nigel Abrera
 * @description Creating an IP Tracker that is fetched from an API and developing it in React
 * @date 10/20/2023
 * @updated 10/27/2023
 */

import React from "react";
import "./styles/styles.css";

const Button = ({ onClick, style, text, isActive, setActive, setButtonStyle }) => {
  const handleClick = () => {
    onClick();
    setActive(!isActive);

    const newStyle = {
      transition: "background-color 0.3s",
      backgroundColor: `rgb(${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)})`,
      borderColor: "rgb(255,255,255)",
    };

    setButtonStyle(newStyle);
  };

  return (
    <button type={isActive ? "submit" : "button"} 
    style={isActive ? style : null} 
    onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
