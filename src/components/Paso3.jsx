import React, { useState } from "react";
import "../../styles/Pasos.css";

function Paso3({ formData, handleChange }) {
  const [weight, setWeight] = useState(formData.weight || "");
  const [maxLength, setMaxLength] = useState(formData.maxLength || "");
  const [maxWidth, setMaxWidth] = useState(formData.maxWidth || "");
  const [maxHeight, setMaxHeight] = useState(formData.maxHeight || "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    switch (name) {
      case "weight":
        setWeight(value);
        break;
      case "maxLength":
        setMaxLength(value);
        break;
      case "maxWidth":
        setMaxWidth(value);
        break;
      case "maxHeight":
        setMaxHeight(value);
        break;
      default:
        break;
    }
    // Actualizar el estado del formulario
    handleChange(e);
  };

  return (
    <>
      {/* Paso 3 */}
      <div className="form-group form-option">
        <label htmlFor="weight">Peso de la mascota</label>
        <input
          type="number"
          className="form-control"
          name="weight"
          value={weight}
          onChange={handleInputChange}
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
        <label>Dimensiones de la mascota</label>
        <p>(estos datos son opcionales pero colocarlos nos permitirá darte una asesoría más precisa)</p>
        <br />
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="maxLength">Longitud (centímetros)</label>
            <input
              type="number"
              className="form-control"
              name="maxLength"
              value={maxLength}
              onChange={handleInputChange}
              placeholder="Ingresa la dimensión en centímetros"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="maxWidth">Ancho (centímetros)</label>
            <input
              type="number"
              className="form-control"
              name="maxWidth"
              value={maxWidth}
              onChange={handleInputChange}
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
              value={maxHeight}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br />
        <a href="https://traveldog.es/como-medir-a-tu-mascota/" target="_blank">Aprende cómo medir a tu mascota en el siguiente link</a>
      </div>
    </>
  );
}

export default Paso3;


