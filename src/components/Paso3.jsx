import React from "react";
import "../../styles/Pasos.css"

function Paso3({ formData, handleChange }) {
  return (
    <>
      {/* Paso 3 */}
      <div className="form-group form-option">
        <label htmlFor="weight">Peso de la mascota</label>
        <input
          type="number"
          className="form-control"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Ingresa el peso de tu mascota en Kg"
          required
        />
      </div>
      <div className="form-group form-option">
        <label htmlFor="age">Edad de la mascota a la fecha del viaje (en semanas)</label>
        <select
          className="form-control"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona la edad de tu mascota</option>
          <option value="9">Más de 8 semanas y menos de 10 semanas</option>
          <option value="11">Más de 10 semanas y menos de 12 semanas</option>
          <option value="13">Más de 12 semanas y menos de 15 semanas</option>
          <option value="15">Más de 15 semanas y menos de 16 semanas</option>
          <option value="20">Más de 16 semanas y menos de 24 semanas</option>
          <option value="24">Más de 24 semanas</option>
        </select>
      </div>
      <div className="form-group form-option">
        <label>Dimensiones de la mascota (estos datos son opcionales pero colocarlos nos permitirá darte una asesoría más precisa)</label>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="maxLength">Longitud (centímetros)</label>
            <input
              type="number"
              className="form-control"
              name="maxLength"
              value={formData.maxLength}
              onChange={handleChange}
              placeholder="Ingresa la dimensión en centímetros"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="maxWidth">Ancho (centímetros)</label>
            <input
              type="number"
              className="form-control"
              name="maxWidth"
              value={formData.maxWidth}
              onChange={handleChange}
              placeholder="Ingresa la dimensión en centímetros"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="maxHeight">Altura (centímetros)</label>
            <input
              type="number"
              className="form-control"
              name="maxHeight"
              placeholder="Ingresa la dimensión en centímetros"
              value={formData.maxHeight}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Paso3;
