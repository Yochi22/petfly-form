import React from "react";
import "../../styles/SideMenu.css";

const SideMenu = ({ currentStep, stepNames }) => {
  return (
    <div className="side-menu">
      <div className="progress-bar">
        {stepNames.map((name, index) => (
          <div
            key={index}
            className={`progress-point ${index === currentStep - 1 ? 'active' : ''}`}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;

