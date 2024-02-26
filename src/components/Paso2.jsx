import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import InfoRazaModal from './InfoRazaModal';

function Paso2({ formData, handleChange }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {/* Paso 2 */}
      <div className="form-group form-option">
        <label htmlFor="petType">Selecciona el tipo de mascota</label>
        <Form.Control
          as="select"
          name="petType"
          value={formData.petType}
          onChange={handleChange}
        >
          <option value="">Selecciona el tipo de mascota</option>
          <option value="Dog">Perro</option>
          <option value="Cat">Gato</option>
        </Form.Control>
      </div>
      <div className="form-group form-option">
        <label htmlFor="breed">Selecciona la raza de tu mascota</label>
        <Form.Control
          as="select"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        >
          <option value="">Selecciona la raza de tu mascota</option>
          <option value="General">General</option>
          <option value="Brachycephalic">Braquicéfala</option>
          <option value="Hazardous">Peligrosa</option>
        </Form.Control>
      
        <button
          type="button"
          className="btn btn-link"
          onClick={handleShowModal}
        >
          Más información sobre razas
        </button>

        
        <InfoRazaModal show={showModal} handleClose={handleCloseModal} />
      </div>
    </>
  );
}

export default Paso2;

