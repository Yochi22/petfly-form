import React from "react";
import logo from "../assets/logo.png"; 
import "../../styles/SideMenu.css";
import NavbarComponent from "./NavbarComponent";

const SideMenu = ({ currentStep, stepNames, handleStepClick, showResults }) => {

  const handleClick = (index) => {
    if (showResults) {
      handleStepClick(index);
    }
  };

  return (
    <div className="side-menu">
      <div className="logo-container">
      <h2>Conoce los costos y trámites para viajar con tu mascota</h2>
      </div>

      <div className="progress-bar">
        {stepNames.map((name, index) => (
          <div
            key={index}
            className={`progress-point ${index === currentStep - 1 ? 'active' : ''} ${showResults ? 'clickable' : ''}`}
            onClick={() => handleClick(index + 1)}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
