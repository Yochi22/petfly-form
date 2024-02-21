import React, { useState, useEffect } from "react";
import Paso1 from "./Paso1";
import Paso2 from "./Paso2";
import Paso3 from "./Paso3";
import Paso4 from "./Paso4";
import Error from "./Error";
import SideMenu from "./SideMenu";
import "./css/Form.css";
import { useMediaQuery } from "react-responsive";

function Formulario() {
  const [formData, setFormData] = useState({
    countryGroup: "",
    airline: "",
    petType: "",
    breed: "",
    weight: "",
    age: "",
    maxLength: "",
    maxWidth: "",
    maxHeight: "",
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const [airlinesData, setAirlinesData] = useState([]);
  const [countryGroupsData, setCountryGroupsData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [cabinaResults, setCabinaResults] = useState([]);
  const [bodegaResults, setBodegaResults] = useState([]);

  const [step, setStep] = useState(1);
  const stepNames = [
    "País de destino y aerolínea",
    "Tipo y raza de mascota",
    "Edad, peso y dimensiones",
    "Resultados",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    let cleanedValue = value;

    if (name === "phone") {
      cleanedValue = value.replace(/\s+/g, "");
    }

    const newValue = ["weight", "maxLength", "maxWidth", "maxHeight"].includes(
      name
    )
      ? parseFloat(cleanedValue === "" ? 0 : cleanedValue)
      : name === "age"
      ? parseInt(cleanedValue, 10)
      : cleanedValue;

    const countryGroupId =
      name === "countryGroup" ? parseInt(cleanedValue, 10) : cleanedValue;

    setFormData({ ...formData, [name]: newValue });
  };

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
      phone,
    } = formData;

    switch (step) {
      case 1:
        if (
          !countryGroup ||
          !airline ||
          countryGroup === "" ||
          airline === ""
        ) {
          setError("Por favor, completa todos los campos.");
          return false;
        }
        break;
      case 2:
        if (!petType || !breed) {
          setError("Por favor, completa todos los campos.");
          return false;
        }
        break;
      case 3:
        if (!weight || !age) {
          setError("Por favor, completa todos los campos.");
          return false;
        }
        break;
      case 4:
        if (!name || !email || !phone) {
          setError("Por favor, completa todos los campos.");
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
          setError("Por favor, ingresa un correo electrónico válido.");
          return false;
        }
        if (!/^\+?\d{10,14}$/.test(phone)) {
          setError("Por favor, ingresa un número de teléfono válido.");
          return false;
        }
        break;
      default:
        break;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    const cleanedPhone = formData.phone.replace(/\s+/g, "").replace("+", "");
    const cleanedFormData = {
      ...formData,
      maxLength: formData.maxLength || 0,
      maxWidth: formData.maxWidth || 0,
      maxHeight: formData.maxHeight || 0,
      phone: cleanedPhone,
    };

    if (validateFields()) {
      try {
        console.log("JSON a enviar:", JSON.stringify(cleanedFormData));

        const response = await fetch("https://petfly-api.onrender.com/leads", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanedFormData),
        });

        const queryParams = new URLSearchParams({
          airlineid: cleanedFormData.airline,
          countrygroupid: cleanedFormData.countryGroup,
          weight: cleanedFormData.weight,
          age: cleanedFormData.age,
          length: cleanedFormData.maxLength,
          width: cleanedFormData.maxWidth,
          height: cleanedFormData.maxHeight,
        });

        if (cleanedFormData.petType.toLowerCase() === "dog") {
          queryParams.set("isdog", "true");
        } else if (cleanedFormData.petType.toLowerCase() === "cat") {
          queryParams.set("iscat", "true");
        }

        if (cleanedFormData.breed === "Brachycephalic") {
          queryParams.append("isbrachycephalic", true);
        }

        if (cleanedFormData.breed === "Hazardous") {
          queryParams.append("ishazardous", true);
        }

        const consultaResponse = await fetch(
          `https://petfly-api.onrender.com/services?${queryParams}`
        );

        if (consultaResponse.ok) {
          const data = await consultaResponse.json();
          setApiData(data);
          handleShowResults(data); // Pasamos los nuevos datos como argumento
          setStep(5);
        } else {
          console.error(
            "Error en la solicitud GET:",
            consultaResponse.statusText
          );
        }
      } catch (error) {
        console.error("Error en la petición POST:", error);
      }
    }
  };

  const handleNextStep = () => {
    if (validateFields()) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    setStep(stepNumber);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://petfly-api.onrender.com/countries"
        );
        if (response.ok) {
          const data = await response.json();
          setCountryGroupsData(data);
        } else {
          console.error("Error al obtener los países.");
        }
      } catch (error) {
        console.error("Error en la petición GET:", error);
      }
    };

    const fetchAirlines = async () => {
      try {
        const response = await fetch(
          "https://petfly-api.onrender.com/airlines"
        );
        if (response.ok) {
          const data = await response.json();
          setAirlinesData(data);
        } else {
          console.error("Error al obtener las aerolíneas.");
        }
      } catch (error) {
        console.error("Error en la petición GET:", error);
      }
    };

    fetchCountries();
    fetchAirlines();
  }, []);

  const handleShowResults = (newData) => {
    setShowResults(true);
    const cabina = newData.filter((result) =>
      result.name.toUpperCase().includes("CABINA")
    );
    const bodega = newData.filter((result) =>
      result.name.toUpperCase().includes("BODEGA")
    );
    setCabinaResults(cabina);
    setBodegaResults(bodega);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 prueba">
          {isMobile && step < 5 && <h2>Viaja con tu mascota</h2>}
          {!isMobile && (
            <div className="col-md-3">
              <SideMenu
                currentStep={step}
                stepNames={stepNames}
                handleStepClick={handleStepClick}
                showResults={showResults}
              />
            </div>
          )}
          <form>
            {/* Renderización condicional de los pasos del formulario */}
            {step === 1 && (
              <Paso1
                formData={formData}
                handleChange={handleChange}
                countryGroupsData={countryGroupsData}
                airlinesData={airlinesData}
              />
            )}
            {step === 2 && (
              <Paso2 formData={formData} handleChange={handleChange} />
            )}
            {step === 3 && (
              <Paso3 formData={formData} handleChange={handleChange} />
            )}
            {step === 4 && (
              <Paso4 formData={formData} handleChange={handleChange} />
            )}
            {/* Botones de navegación */}
            <div className="text-danger">{error}</div>

            <div className="row contenedor-padre-flex">
              {step > 1 && step < 5 && (
                <div className="col-md-6 d-flex justify-content-start">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handlePreviousStep}
                  >
                    Atrás
                  </button>
                </div>
              )}
              <div className="col-md-6 d-flex justify-content-end ">
                {step < 4 && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextStep}
                  >
                    Siguiente
                  </button>
                )}

                {step === 4 && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Conocer resultados
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {showResults && step > 4 && (
        <div className="container container-results">
          <div className="row justify-content-center">
            {apiData.length > 0 ? (
              <>
                <div className="title-results">
                  <h2>Costo de la aerolínea para tu mascota</h2>
                </div>
                {cabinaResults.length > 0 && (
                  <div className="viajes-cabina-container">
                    <h3>Viajes en cabina con mascotas</h3>
                    <div className="viajes-cabina-grid">
                      {cabinaResults.map((result, index) => (
                        <div key={index} className="viaje-cabina-item">
                          <h4>{result.name.toUpperCase()}</h4>
                          <p>
                            Costo:{" "}
                            {result.price === 0
                              ? "GRATIS"
                              : result.price === null
                              ? "El precio varía según distintas condiciones"
                              : `${result.price} ${result.currency}`}
                          </p>
                          {result.name.toUpperCase() ===
                            "CABINA SIN CERTIFICADO" && (
                            <p>
                              Al cancelar el fee de la aerolínea, tu mascota
                              puede viajar en cabina contigo.
                            </p>
                          )}
                          {result.name.toUpperCase() ===
                            "CABINA CON CERTIFICADO" && (
                            <p>
                              Tu mascota califica al certificado de animal de
                              apoyo emocional y podría viajar contigo sin costo
                              adicional. Haz clic en el botón de WhatsApp para
                              solicitarlo.
                            </p>
                          )}
                          {result.name.toUpperCase() ===
                            "CABINA CON PERRO DE SERVICIO" && (
                            <p>
                              Tu perro podría ser un perro de servicio y podría
                              viajar contigo en cabina sin costo adicional. Haz
                              clic en el botón de WhatsApp para solicitarlo.
                            </p>
                          )}
                          {result.name.toUpperCase() ===
                            "CABINA CON CERTIFICADO" && (
                            <div className="button-container">
                              <a
                                href="https://api.whatsapp.com/send?phone=TUNUMERODEWHATSAPP"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-button"
                              >
                                WhatsApp
                              </a>
                            </div>
                          )}
                          {result.name.toUpperCase() ===
                            "CABINA CON PERRO DE SERVICIO" && (
                            <div className="button-container">
                              <a
                                href="https://api.whatsapp.com/send?phone=TUNUMERODEWHATSAPP"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-button"
                              >
                                WhatsApp
                              </a>
                            </div>
                          )}

                          {result.extras !== null && (
                            <p>Consideraciones extras: {result.extras}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {bodegaResults.length > 0 && (
                  <div className="viajes-bodega-container">
                    <h3>Viajes en bodega con mascotas</h3>
                    <div className="viajes-bodega-grid">
                      {bodegaResults.map((result, index) => (
                        <div key={index} className="viaje-bodega-item">
                          <h4>{result.name.toUpperCase()}</h4>
                          <p>
                            Costo:{" "}
                            {result.price === 0
                              ? "GRATIS"
                              : result.price === null
                              ? "El precio varía según distintas condiciones"
                              : `${result.price} ${result.currency}`}
                          </p>
                          {result.name.toUpperCase() === "BODEGA" && (
                            <p>
                              Al cancelar el fee de la aerolínea, tu mascota
                              puede viajar en bodega.
                            </p>
                          )}
                          {result.name.toUpperCase() ===
                            "BODEGA CON CERTIFICADO" && (
                            <p>
                              Tu mascota podría ser un animal de apoyo emocional
                              y viajar en bodega sin gasto adicional.
                            </p>
                          )}
                          {result.name.toUpperCase() ===
                            "BODEGA CON CERTIFICADO" && (
                            <div className="button-container">
                              <a
                                href="https://api.whatsapp.com/send?phone=TUNUMERODEWHATSAPP"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-button"
                              >
                                WhatsApp
                              </a>
                            </div>
                          )}
                          {result.extras !== null && (
                            <p>Consideraciones extras: {result.extras}</p>
                          )}
                        </div>
                      ))}
                      <div className="additional-info">
                        <p>
                          Trámites veterinarios:{" "}
                          {apiData[0].description.replace("�", "ó")}
                        </p>
                        <p>
                          Precio aproximado de los trámites:{" "}
                          {apiData[0].comments.replace("�", "í")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Error />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Formulario;
