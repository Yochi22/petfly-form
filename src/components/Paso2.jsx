import React from "react";
import "../../styles/Pasos.css"

function Paso2({ formData, handleChange }) {
  return (
    <>
      {/* Paso 2 */}
      <div className="form-group form-option">
        <label htmlFor="petType">Selecciona el tipo de mascota</label>
        <select
          className="form-control"
          name="petType"
          value={formData.petType}
          onChange={handleChange}
        >
          <option value="">Selecciona el tipo de mascota</option>
          <option value="Dog">Perro</option>
          <option value="Cat">Gato</option>
        </select>
      </div>
      <div className="form-group form-option">
        <label htmlFor="breed">Selecciona la raza de tu mascota</label>
        <select
          className="form-control"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        >
          <option value="">Selecciona la raza de tu mascota</option>
          <option value="Brachycephalic">Braquicéfalo</option>
          <option value="Hazardous">Peligroso</option>
          <option value="General">General</option>
        </select>
      </div>
    </>
  );
}

export default Paso2;
