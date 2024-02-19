import React from 'react'
import '../../styles/Error.css'

const Error = () => {
  return (
        <div className="contacto">
          <div className="contacto-content">
            <h2>¡OOOPS!</h2>
            <p>Tu búsqueda no arrojó ningún resultado. Ponte en contacto con nosotros para una asesoría más personalizada.</p>
            <a href="https://api.whatsapp.com/send?phone=TUNUMERODEWHATSAPP" target="_blank" rel="noopener noreferrer" className="whatsapp-button">Chatear por WhatsApp</a>
          </div>
        </div>
      );
    }

export default Error