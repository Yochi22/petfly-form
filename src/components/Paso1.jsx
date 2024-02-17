import React from "react";

const Paso1 = ({ formData, countryGroupsData, airlinesData, handleChange }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="countryGroup">¿Cuál es el país de destino?</label>
        <select
          className="form-control"
          name="countryGroup"
          value={formData.countryGroup}
          onChange={handleChange}
        >
          <option key="default" value="">
            Seleccione un país
          </option>
          {countryGroupsData.map((country) => (
            <option key={country.country_group_id} value={country.country_group_id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="airline">¿Con cuál aerolínea viajas?</label>
        <select
          className="form-control"
          name="airline"
          value={formData.airline}
          onChange={handleChange}
        >
          <option key="default" value="">
            Seleccione una aerolínea
          </option>
          {airlinesData.map((airline) => (
            <option key={airline.airline_id} value={airline.airline_id}>
              {airline.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Paso1;