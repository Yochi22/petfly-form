import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import CountryList from 'react-select-country-list';

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    numeroTelefono: '',
    correoElectronico: '',
    aerolineaTransporte: '',
    paisDestino: '',
    tipoMascota: '',
    pesoMascota: '',
    razaMascota: '',
    edadMascota: '',
    dimensionesMascota: '',
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [areaCodes, setAreaCodes] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    //códigos de área. debo revisar si hay libreria para esto
    const mockAreaCodes = [
      { label: 'USA (+1)', value: '1' },
      { label: 'UK (+44)', value: '44' },

    ];
    setAreaCodes(mockAreaCodes);

   //lista de paises
    setCountries(CountryList().getData());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'numeroTelefono') {
      // aqui guardamos sin el + para manychat
      const formattedPhoneNumber = value.replace(/\+/g, '');
      setFormData({ ...formData, [name]: formattedPhoneNumber });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEmailValidation = (email) => {
    // validar que el correo tenga un @
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!handleEmailValidation(formData.correoElectronico)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    try {
      //Enviamos datos del form a la base de datos
      const response = await axios.post('url', formData);

      //capturar error
      setApiResponse(response.data);
      console.log('Respuesta de la API:', response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      // solo se pasará al paso 2 después de enviar los datos básicos
      if (!formData.nombreCompleto || !formData.numeroTelefono || !handleEmailValidation(formData.correoElectronico)) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
      }
    }

    if (step === 1) {
      // el primer paso será enviar los datos a la bd para crear el susbscriber en manychat
      try {
        const response = await axios.post('url', formData);
        
        console.log('Respuesta de la API (Paso 1):', response.data);
      } catch (error) {
        console.error('Error al enviar los datos (Paso 1):', error);
        return;
      }
    }

    setStep(step + 1);
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, paisDestino: selectedOption.value });
  };

  const handleAreaCodeChange = (selectedOption) => {
    setFormData({ ...formData, numeroTelefono: `+${selectedOption.value}` });
  };

  return (
    <div className="container">
      <form>
        {step === 1 && (
          <>
            <div className="mb-3">
              <label htmlFor="nombreCompleto" className="form-label">
                Nombre Completo:
                <input
                  type="text"
                  className="form-control"
                  id="nombreCompleto"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="numeroTelefono" className="form-label">
                Número de Teléfono:
                <div>
                  <Select options={areaCodes} onChange={handleAreaCodeChange} />
                  <input
                    type="tel"
                    className="form-control"
                    id="numeroTelefono"
                    name="numeroTelefono"
                    value={formData.numeroTelefono}
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="correoElectronico" className="form-label">
                Correo Electrónico:
                <input
                  type="text"
                  className="form-control"
                  id="correoElectronico"
                  name="correoElectronico"
                  value={formData.correoElectronico}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleNextStep}>
              Siguiente
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-3">
              <label htmlFor="paisDestino" className="form-label">
                País de Destino:
                <Select options={countries} onChange={handleCountryChange} />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Aerolínea o Empresa de Transporte:
                <input type="text" name="aerolineaTransporte" value={formData.aerolineaTransporte} onChange={handleChange} />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Tipo de Mascota:
                <input type="text" name="tipoMascota" value={formData.tipoMascota} onChange={handleChange} />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Peso de la Mascota:
                <input type="text" name="pesoMascota" value={formData.pesoMascota} onChange={handleChange} />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Raza de la Mascota:
                <input type="text" name="razaMascota" value={formData.razaMascota} onChange={handleChange} />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Edad de la Mascota:
                <input type="text" name="edadMascota" value={formData.edadMascota} onChange={handleChange} />
              </label>
            </div>
            <div className="mb-3">
              <label>
                Dimensiones de la Mascota:
                <input
                  type="text"
                  name="dimensionesMascota"
                  value={formData.dimensionesMascota}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="button" className="btn btn-success" onClick={handleSubmit}>
              Enviar
            </button>
          </>
        )}

        {apiResponse && (
          <div className="alert alert-success" role="alert">
            <h2>COTIZACIÓN</h2>
            <p>{apiResponse}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
