import React from "react";
import "../../styles/Pasos.css"

function Paso1({ formData, handleChange, countryGroupsData, airlinesData }) {
  return (
    <>
      {/* Paso 1 */}
      <div className="form-group form-option">
        <label htmlFor="countryGroup">País o región de destino</label>
        <select
          className="form-control"
          name="countryGroup"
          value={formData.countryGroup}
          onChange={handleChange}
        >
          <option key="default" value="">
            Seleccione país o región
          </option>
          {countryGroupsData.map((country) => (
            <option
              key={country.country_group_id}
              value={country.country_group_id}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group form-option">
  <label htmlFor="airline">¿Con cuál aerolínea o empresa de transporte viajas?</label>
  <select
    className="form-control"
    name="airline"
    value={formData.airline}
    onChange={handleChange}
  >
    <option key="default" value="">
      Seleccione una aerolínea o empresa de transporte
    </option>
    {airlinesData.sort((a, b) => a.name.localeCompare(b.name)) 
      .map((airline) => (
        <option
          key={airline.airline_id}
          value={airline.airline_id}
        >
          {airline.name}
        </option>
      ))}
  </select>
</div>
    </>
  );
}

export default Paso1;
