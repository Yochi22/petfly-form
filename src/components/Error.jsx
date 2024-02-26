import React from 'react'
import '../../styles/Error.css'

const Error = ({onHandlePreviousStep}) => {
  return (
        <div className="contacto">
          <div className="contacto-content">
            <h2>¡OOOPS!</h2>
            <p>Tu búsqueda no arrojó ningún resultado. Ponte en contacto con nosotros para una asesoría más personalizada.</p>
            <a href="https://api.whatsapp.com/send?phone=573183207294&text=Hola!%20quiero%20una%20asesor%C3%ADa%20m%C3%A1s%20personalizada%20sobre%20como%20viajar%20con%20mi%20mascota." target="_blank" rel="noopener noreferrer" className="whatsapp-button">Chatear por WhatsApp</a>
          </div>
          <div className="col-md-6 d-flex justify-content-start">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onHandlePreviousStep}
                  >
                    Atrás
                  </button>
                </div>
            </div>        
      );
    }

export default Error