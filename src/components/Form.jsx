import React, { useState, useEffect } from 'react';

function Formulario() {
  const [formData, setFormData] = useState({
    countryGroup: '',
    airline: '',
    petType: '',
    breed: '',
    weight: '',
    age: '',
    maxLength: '',
    maxWidth: '',
    maxHeight: '',
    name: '',
    email: '',
    phone: ''
  });

  const [step, setStep] = useState(1); // Controla el paso actual del formulario
  const [error, setError] = useState(''); // Manejar errores de validación
  const [countries, setCountries] = useState([]);
  const [airlines, setAirlines] = useState([]);

  // Función para manejar el cambio de datos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar el valor del campo 'phone' y convertir otros campos a números si corresponde
    const cleanedValue = name === 'phone' ? value.replace(/\s+/g, '').replace('+', '') : value;
    const newValue = ['weight', 'age', 'maxLength', 'maxWidth', 'maxHeight'].includes(name)
      ? parseFloat(value === '' ? 0 : value)
      : cleanedValue;

      setFormData({ ...formData, [name]: name === 'phone' ? cleanedValue : newValue });

  };

  // Función para validar los campos requeridos en el paso actual
  const validateFields = () => {
    const {
      countryGroup,
      airline,
      petType,
      breed,
      weight,
      age,
      name,
      email,
      phone
    } = formData;

    switch (step) {
      case 1:
        if (!countryGroup || !airline) {
          setError('Por favor, completa todos los campos.');
          return false;
        }
        break;
      case 2:
        if (!petType || !breed) {
          setError('Por favor, completa todos los campos.');
          return false;
        }
        break;
      case 3:
        if (!weight || !age || !name || !email || !phone) {
          setError('Por favor, completa todos los campos.');
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
          setError('Por favor, ingresa un correo electrónico válido.');
          return false;
        }
        if (!/^\+?\d{10,14}$/.test(phone)) {
          setError('Por favor, ingresa un número de teléfono válido.');
          return false;
        }
        break;
      default:
        break;
    }

    setError('');
    return true;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    const cleanedFormData = {
      ...formData,
      maxLength: formData.maxLength || 0,
      maxWidth: formData.maxWidth || 0,
      maxHeight: formData.maxHeight || 0,
      phone: formData.phone.replace(/\s+/g, '').replace('+', '') // Limpiar el número de teléfono antes de enviarlo
    };
  
    if (validateFields()) {
      try {
        console.log('JSON a enviar:', JSON.stringify(cleanedFormData));
  
        const response = await fetch('https://petfly-api.onrender.com/leads', {
          method: 'POST',
          mode: "no-cors",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cleanedFormData)
        });
        if (response.ok) {
          const queryParams = new URLSearchParams({
            airlineid: cleanedFormData.airline,
            countrygroupid: cleanedFormData.countryGroup,
            weight: cleanedFormData.weight,
            age: cleanedFormData.age,
            length: cleanedFormData.maxLength,
            width: cleanedFormData.maxWidth,
            height: cleanedFormData.maxHeight,
            isdog: cleanedFormData.petType === true,
            isbrachycephalic: cleanedFormData.breed === true
          });
          const consultaResponse = await fetch(`https://petfly-api.onrender.com/services?${queryParams}`);
          const data = await consultaResponse.json();
          console.log('Respuesta de la consulta GET:', data);
        } else {
          console.error('Error al enviar datos del formulario.');
        }
      } catch (error) {
        console.error('Error en la petición POST:', error);
      }
    }
  };

  // Función para manejar el cambio de paso del formulario
  const handleNextStep = () => {
    if (validateFields()) {
      setStep(step + 1);
    }
  };

  // Obtener países y aerolíneas al cargar el componente
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://petfly-api.onrender.com/countries');
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        } else {
          console.error('Error al obtener los países.');
        }
      } catch (error) {
        console.error('Error en la petición GET:', error);
      }
    };

    const fetchAirlines = async () => {
      try {
        const response = await fetch('https://petfly-api.onrender.com/airlines');
        if (response.ok) {
          const data = await response.json();
          setAirlines(data);
        } else {
          console.error('Error al obtener las aerolíneas.');
        }
      } catch (error) {
        console.error('Error en la petición GET:', error);
      }
    };

    fetchCountries();
    fetchAirlines();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form>
            {step === 1 && (
              <>
                <div className="form-group">
                  <label htmlFor="countryGroup">¿Cuál es el país de destino?</label>
                  <select
                    className="form-control"
                    name="countryGroup"
                    value={formData.countryGroup}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un país</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="airline">¿Con cuál aerolínea viajas?</label>
                  <select
                    className="form-control"
                    name="airline"
                    value={formData.airline}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione una aerolínea</option>
                    {airlines.map(airline => (
                      <option key={airline.id} value={airline.id}>{airline.name}</option>
                    ))}
                  </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleNextStep}>Siguiente</button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="form-group">
                  <label htmlFor="petType">Selecciona el tipo de mascota</label>
                  <select
                    className="form-control"
                    name="petType"
                    value={formData.petType}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona el tipo de mascota</option>
                    <option value="dog">Perro</option>
                    <option value="cat">Gato</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="breed">Selecciona la raza de tu mascota</label>
                  <select
                    className="form-control"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona la raza de tu mascota</option>
                    <option value="Brachycephalic">Braquicéfalo</option>
                    <option value="Hazardous">Peligroso</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleNextStep}>Siguiente</button>
              </>
            )}
            {step === 3 && (
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
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="^\+?\d{10,14}$"
                    placeholder="+57 3504386542"
                    required
                  />
                </div>
                <button type="button" className="btn btn-success" onClick={handleSubmit}>Conocer resultados</button>
              </>
            )}
            <div className="text-danger">{error}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Formulario;
