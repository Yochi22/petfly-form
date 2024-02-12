import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    numeroTelefono: '',
    correoElectronico: '',
    paisDestino: '',
    tipoMascota: '',
    pesoMascota: '',
    razaMascota: '',
    edadMascota: '',
    dimensionesMascota: '',
  });
  const [countriesList, setCountriesList] = useState([]);
  const [airlines, setAirlines] = useState([]);

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
        setCountriesList(data.map(country => ({
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
    setFormData({ ...formData, [name]: value });
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
      const formattedPhoneNumber = formData.numeroTelefono.replace(/\s|\+/g, '');
      setFormData({ ...formData, numeroTelefono: formattedPhoneNumber });
    }

    setStep(step + 1);
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, paisDestino: selectedOption.value });
  };

  const handleAirlineChange = (selectedOption) => {
    setFormData({ ...formData, aerolineaTransporte: selectedOption.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('URL_DE_TU_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Formulario enviado exitosamente');
        // Hay que analizar como obtener la respuesta, tal vez redirigiendo a otra página. no sé
      } else {
        alert('Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      alert('Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDimensionChange = (index, value) => {
    const dimensions = [...formData.dimensionesMascota.split(',')];
    dimensions[index] = value;
    setFormData({ ...formData, dimensionesMascota: dimensions.join(',') });
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
                <PhoneInput
                  international
                  defaultCountry="CO"
                  value={formData.numeroTelefono}
                  onChange={(value) => setFormData({ ...formData, numeroTelefono: value })}
                />
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
                <Select options={countriesList} onChange={handleCountryChange} />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="aerolineaTransporte" className="form-label">
                Aerolínea o Empresa de Transporte:
                <Select options={airlines} onChange={handleAirlineChange} />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="tipoMascota" className="form-label">
                Tipo de Mascota:
                <Select
                  options={[
                    { value: 'Perro', label: 'Perro' },
                    { value: 'Gato', label: 'Gato' }
                  ]}
                  onChange={(selectedOption) => setFormData({ ...formData, tipoMascota: selectedOption.value })}
                  value={{ value: formData.tipoMascota, label: formData.tipoMascota }}
                  isSearchable={false}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="razaMascota" className="form-label">
                Raza de la Mascota:
                <Select
                  options={[
                    { value: 'Braquicéfalo', label: 'Braquicéfalo' },
                    { value: 'Peligrosos', label: 'Peligrosos' },
                    { value: 'General', label: 'General' }
                  ]}
                  onChange={(selectedOption) => setFormData({ ...formData, razaMascota: selectedOption.value })}
                  value={{ value: formData.razaMascota, label: formData.razaMascota }}
                  isSearchable={false}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="pesoMascota" className="form-label">
                Peso de la Mascota:
                <input
                  type="number"
                  name="pesoMascota"
                  value={formData.pesoMascota}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="edadMascota" className="form-label">
                Edad de la Mascota:
                <Select
                  options={[
                    { value: '4', label: 'Más de 4 semanas' },
                    { value: '8', label: 'Más de 8 semanas' },
                    { value: '12', label: 'Más de 12 semanas' },
                    { value: '16', label: 'Más de 16 semanas' },
                    { value: '20', label: 'Más de 20 semanas' },
                    { value: '24', label: 'Más de 24 semanas' }
                  ]}
                  onChange={(selectedOption) => setFormData({ ...formData, edadMascota: selectedOption.value })}
                  value={{ value: formData.edadMascota, label: `Más de ${formData.edadMascota} semanas` }}
                  isSearchable={false}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="dimensionesMascota" className="form-label">
                Dimensiones de la Mascota (OPCIONAL):
                <input
                  type="text"
                  name="dimensionesMascota"
                  value={formData.dimensionesMascota.split(',')[0]}
                  onChange={(e) => handleDimensionChange(0, e.target.value)}
                  placeholder="Largo (cm)"
                
                />
                <input
                  type="text"
                  name="dimensionesMascota"
                  value={formData.dimensionesMascota.split(',')[1]}
                  onChange={(e) => handleDimensionChange(1, e.target.value)}
                  placeholder="Ancho (cm)"
                  
                />
                <input
                  type="text"
                  name="dimensionesMascota"
                  value={formData.dimensionesMascota.split(',')[2]}
                  onChange={(e) => handleDimensionChange(2, e.target.value)}
                  placeholder="Alto (cm)"
                
                />
              </label>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              ENVIAR
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
