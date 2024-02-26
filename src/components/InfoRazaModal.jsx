import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/Pasos.css'

function InfoRazaModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='modal-title'><h3>Información sobre razas</h3></Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body'>
        <h4>Braquicéfalo: Se refiere a mascotas con cabezas cortas y achatadas.</h4>
        <h5>Perros de Raza Braquicéfala incluyen las siguientes razas:</h5>
        <ul>
          <li>Affenpinscher, Boston Terrier, Bulldog (todas las razas), Cane Corso o Mastín Italiano, Chow Chow, Toy Spaniel Ingles, Grifón de Bruselas, Chin Japones, Lhasa Apso, Mastín Ingles, Pekinés, Pug o Carlino (todas las razas) , Shar Pei, Shih Tzu, Spaniel tibetano, Staffordshire Terrier Americano (Amstaff), Staffordshire Bull Terrier Ingles (Staffi), Pitbull Terrier Americano, Bullmastiff, Dogo de Burdeos, Mastín Napolitano, Presa Canario.</li>
        </ul>
        <h5>Gatos de Raza Braquicéfala incluyen las siguientes razas:</h5>
        <ul>
          <li>Burmese Americano, Himalayo, Persa, Shorthair Exótico, Silver(nuevo)</li>
        </ul>
        <h4>Peligrosas: Mascotas que pueden representar un riesgo para la seguridad debido a su tamaño, fuerza o comportamiento.</h4>
        <h5>Perros peligrosos incluyen las siguientes razas:</h5>
        <ul>
          <li>Bull Terrier, Bulldog Americano, American Bully (Nuevo), Akita In, Dogo Argentino, Fila Brasilero, Karabash, Rottweiler, Tosa Japonés, Staffordshire Terrier Americano (Amstaff), Staffordshire Bull Terrier Ingles (Staffi), Pitbull Terrier Americano, Bullmastiff, Dogo de Burdeos, Mastín Napolitano, Presa Canario.</li>
        </ul>
        <h4>General: Mascotas comunes que no tienen características particulares en términos de tamaño, forma o peligrosidad.</h4>
        <p>Por ejemplo, toda mascota que no pertenezca a Braquicéfala ni peligrosa.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoRazaModal;




