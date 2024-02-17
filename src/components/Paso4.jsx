import React from "react";

const Paso4 = ({ formData, handleChange }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Número de Teléfono</label>
        <input
          type="tel"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+57 3505297452"
          required
        />
      </div>
    </>
  );
};

export default Paso4;
