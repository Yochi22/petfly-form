import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Form = () => {
  const [step, setStep] = useState(1);
  const [formDataStep1, setFormDataStep1] = useState({
    nombreCompleto: '',
    numeroTelefono: '',
    correoElectronico: '',
  });
  const [formDataStep2, setFormDataStep2] = useState({
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

  const handleChangeStep1 = (e) => {
    const { name, value } = e.target;
    setFormDataStep1({ ...formDataStep1, [name]: value });
  };

  const handleChangeStep2 = (e) => {
    const { name, value } = e.target;
    setFormDataStep2({ ...formDataStep2, [name]: value });
  };

  const handleEmailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formDataStep1.nombreCompleto || !formDataStep1.numeroTelefono || !handleEmailValidation(formDataStep1.correoElectronico)) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
      }
      const formattedPhoneNumber = formDataStep1.numeroTelefono.replace(/\s|\+/g, '');
      setFormDataStep1({ ...formDataStep1, numeroTelefono: formattedPhoneNumber });
    }

    setStep(step + 1);
  };

  const handleCountryChange = (selectedOption) => {
    setFormDataStep2({ ...formDataStep2, paisDestino: selectedOption.value });
  };

  const handleAirlineChange = (selectedOption) => {
    setFormDataStep2({ ...formDataStep2, aerolineaTransporte: selectedOption.value });
  };

  const handleSubmitStep1 = async () => {
    // Validamos que los campos son requeridos
    if (!formDataStep1.nombreCompleto || !formDataStep1.numeroTelefono || !formDataStep1.correoElectronico) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    // Validamos que el correo tenga un formato correcto
    if (!handleEmailValidation(formDataStep1.correoElectronico)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }
  
    // Formateamos el número porque manychat solo acepta numeros sin el signo + ni espacios
    const formattedPhoneNumber = formDataStep1.numeroTelefono.replace(/\s|\+/g, '');
    setFormDataStep1({ ...formDataStep1, numeroTelefono: formattedPhoneNumber });
  
    // Enviar datos del primer paso
    try {
      const response = await fetch('endpoint api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataStep1),
      });
  
      if (response.ok) {
        alert('Datos del primer paso del formulario enviados exitosamente');
        setStep(2); // Cambiar al siguiente paso
      } else {
        alert('Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar datos del primer paso del formulario:', error);
      alert('Hubo un problema al enviar los datos del primer paso del formulario. Por favor, inténtalo de nuevo.');
    }
  };
  
  const handleSubmitStep2 = async () => {
    try {
      const response = await fetch('endpoint api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataStep2),
      });

      if (response.ok) {
        alert('Datos del segundo paso del formulario enviados exitosamente');
      } else {
        alert('Hubo un problema al enviar los datos del segundo paso del formulario. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar datos del segundo paso del formulario:', error);
      alert('Hubo un problema al enviar los datos del segundo paso del formulario. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDimensionChange = (index, value) => {
    const dimensions = [...formDataStep2.dimensionesMascota.split(',')];
    dimensions[index] = value;
    setFormDataStep2({ ...formDataStep2, dimensionesMascota: dimensions.join(',') });
  };

  const handleSubmit = () => {
    if (step === 1) {
      handleSubmitStep1();
    } else if (step === 2) {
      handleSubmitStep2();

      console.log(JSON.stringify(formDataStep1))
    }
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
                  value={formDataStep1.nombreCompleto}
                  onChange={handleChangeStep1}
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="numeroTelefono" className="form-label">
                Número de Teléfono:
                <PhoneInput
                  international
                  defaultCountry="CO"
                  value={formDataStep1.numeroTelefono}
                  onChange={(value) => setFormDataStep1({ ...formDataStep1, numeroTelefono: value })}
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
                  value={formDataStep1.correoElectronico}
                  onChange={handleChangeStep1}
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
                  onChange={(selectedOption) => setFormDataStep2({ ...formDataStep2, tipoMascota: selectedOption.value })}
                  value={{ value: formDataStep2.tipoMascota, label: formDataStep2.tipoMascota }}
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
                  onChange={(selectedOption) => setFormDataStep2({ ...formDataStep2, razaMascota: selectedOption.value })}
                  value={{ value: formDataStep2.razaMascota, label: formDataStep2.razaMascota }}
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
                  className="form-control"
                  name="pesoMascota"
                  value={formDataStep2.pesoMascota}
                  onChange={handleChangeStep2}
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
                  onChange={(selectedOption) => setFormDataStep2({ ...formDataStep2, edadMascota: selectedOption.value })}
                  value={{ value: formDataStep2.edadMascota, label: `Más de ${formDataStep2.edadMascota} semanas` }}
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
                  className="form-control"
                  name="dimensionesMascota"
                  value={formDataStep2.dimensionesMascota.split(',')[0]}
                  onChange={(e) => handleDimensionChange(0, e.target.value)}
                  placeholder="Largo (cm)"
                
                />
                <input
                  type="text"
                  className="form-control"
                  name="dimensionesMascota"
                  value={formDataStep2.dimensionesMascota.split(',')[1]}
                  onChange={(e) => handleDimensionChange(1, e.target.value)}
                  placeholder="Ancho (cm)"
                  
                />
                <input
                  type="text"
                  className="form-control"
                  name="dimensionesMascota"
                  value={formDataStep2.dimensionesMascota.split(',')[2]}
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
