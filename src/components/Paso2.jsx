import React, { useState } from "react";
import "../../styles/Pasos.css";
import { Tooltip } from "react-tooltip";

function Paso2({ formData, handleChange }) {
  function InfoRazaMascota() {
    return (
      <div className="tooltip-container">
       <p className="tooltip-trigger">Haz click para conocer más información sobre las razas</p>
        <div className="tooltip-content">
          <p>Braquicéfalo: Se refiere a mascotas con cabezas cortas y achatadas.</p>
          <p>Perros de Raza Braquicéfala incluyen las siguientes razas:</p>
          <ul>
            <li>Affenpinscher, Boston Terrier, Bulldog (todas las razas), Cane Corso o Mastín Italiano, Chow Chow, Toy Spaniel Ingles, Grifón de Bruselas, Chin Japones, Lhasa Apso, Mastín Ingles, Pekinés, Pug o Carlino (todas las razas) , Shar Pei, Shih Tzu, Spaniel tibetano</li>
          </ul>
          <p>Peligrosas: Mascotas que pueden representar un riesgo para la seguridad debido a su tamaño, fuerza o comportamiento.</p>
          <p>Perros peligrosos incluyen las siguientes razas:</p>
          <ul>
            <li>Bull Terrier, Bulldog Americano, American Bully (Nuevo), Akita In, Dogo Argentino, Fila Brasilero, Karabash, Rottweiler, Tosa Japonés.</li>
          </ul>
          <p>General: Mascotas comunes que no tienen características particulares en términos de tamaño, forma o peligrosidad.</p>
          <p>Por ejemplo, toda mascota que no pertenezca a Braquicéfala ni peligrosa.</p>
        </div>
      </div>
    );
  }
  
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
        <InfoRazaMascota />
        <select
          className="form-control"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        >
          <option value="">Selecciona la raza de tu mascota</option>
          <option value="General">General</option>
          <option value="Brachycephalic">Braquicéfala</option>
          <option value="Hazardous">Peligrosa</option>
        </select>
      </div>
    </>
  );
}

export default Paso2;
