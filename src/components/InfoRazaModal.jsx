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
        <h4>Razas Braquicéfalas: mascotas con cabezas cortas y achatadas.</h4>
        <p>Perros de Raza Braquicéfala incluyen las siguientes razas:</p>
        <ul>
          <li>Affenpinscher, Boxer, Boston Terrier, Bullmastiff, Bulldog (todas las razas), Cane Corso o Mastín Italiano, Chow Chow, Chin Japones, Dogo de Burdeos, Grifón de Bruselas, Lhasa Apso, Mastín Ingles, Mastín Napolitano, Pekinés, Pitbull Terrier Americano, Presa Canario, Pug o Carlino (todas las razas), Shar Pei, Shih Tzu, Spaniel tibetano, Staffordshire Bull Terrier Ingles (Staffi), Staffordshire Terrier Americano (Amstaff), Toy Spaniel Ingles.
</li>
        </ul>
        <p>Gatos de Raza Braquicéfala incluyen las siguientes razas:</p>
        <ul>
          <li>Burmese Americano, Himalayo, Persa, Shorthair Exótico, Silver(nuevo)</li>
        </ul>
        <h4>Razas Peligrosas: razas consideradas como peligrosas por las aerolíneas.</h4>
        <p>Perros de Raza peligrosa incluyen las siguientes razas:</p>
        <ul>
          <li>Akita In, American Bully (Nuevo), Boxer, Bulldog Americano, Bull Terrier, Bullmastiff, Dogo Argentino, Dogo de Burdeos, Fila Brasilero, Karabash, Mastín Napolitano, Pitbull Terrier Americano, Presa Canario, Rottweiler, Staffordshire Bull Terrier Ingles (Staffi), Staffordshire Terrier Americano (Amstaff), Tosa Japonés.</li>
        </ul>
        <h4>General: cualquier raza que que no pertenezca a braquicéfala ni peligrosa</h4>
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




