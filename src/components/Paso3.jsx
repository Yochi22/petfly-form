import React from "react";

const Paso3 = ({ formData, handleChange }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="weight">Peso de la mascota(Kg)</label>
        <input
          type="number"
          className="form-control"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Edad de la mascota</label>
        <select
          className="form-control"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona la edad de tu mascota</option>
          <option value="3.5">Menos de 4 semanas</option>
          <option value="4">Más de 4 semanas</option>
          <option value="6">Más de 6 semanas</option>
          <option value="8">Más de 8 semanas</option>
          <option value="12">Más de 12 semanas</option>
          <option value="16">Más de 16 semanas</option>
          <option value="20">Más de 20 semanas</option>
        </select>
      </div>
      <div className="form-group">
        <label>Dimensiones de la mascota (en cm)</label>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="maxLength">Longitud</label>
            <input
              type="number"
              className="form-control"
              name="maxLength"
              value={formData.maxLength}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="maxWidth">Ancho</label>
            <input
              type="number"
              className="form-control"
              name="maxWidth"
              value={formData.maxWidth}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="maxHeight">Altura</label>
            <input
              type="number"
              className="form-control"
              name="maxHeight"
              value={formData.maxHeight}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Paso3;