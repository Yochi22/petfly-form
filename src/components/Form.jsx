import React, { useState, useEffect } from 'react';
import Select from 'react-select';

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
  const [areaCodes, setAreaCodes] = useState([
    { label: 'USA (+1)', value: '1' },
    { label: 'UK (+44)', value: '44' },
  ]);
  const [countries, setCountries] = useState([]);
  const [airlines, setAirlines] = useState([]);

  const handleAreaCodeChange = (selectedOption) => {
    setFormData({ ...formData, numeroTelefono: `+${selectedOption.value}` });
  };

  useEffect(() => {
    // Obtener países de la API
    if (step === 2) {
      fetchCountries();
      fetchAirlines();
    }
  }, [step]);

  const fetchCountries = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const response = await fetch("https://petfly-api.onrender.com/countries", requestOptions);
      if (response.ok) {
        const data = await response.json();
        setCountries(data.map(country => ({
          label: country.name,
          value: country.code
        })));
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchAirlines = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const response = await fetch("https://petfly-api.onrender.com/airlines", requestOptions);
      if (response.ok) {
        const data = await response.json();
        setAirlines(data.map(airline => ({
          label: airline.name,
          value: airline.id
        })));
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error fetching airlines:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'numeroTelefono') {
      const formattedPhoneNumber = value.replace(/\+/g, '');
      setFormData({ ...formData, [name]: formattedPhoneNumber });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEmailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.nombreCompleto || !formData.numeroTelefono || !handleEmailValidation(formData.correoElectronico)) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
      }
    }

    setStep(step + 1);
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, paisDestino: selectedOption.value });
  };

  const handleAirlineChange = (selectedOption) => {
    setFormData({ ...formData, aerolineaTransporte: selectedOption.value });
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
              <label htmlFor="aerolineaTransporte" className="form-label">
                Aerolínea o Empresa de Transporte:
                <Select options={airlines} onChange={handleAirlineChange} />
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
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
