import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Navbar.css';
import logo from '../assets/logo.png';

export function NavbarComponent() {
  return (
    <Navbar className='navbar-container'>
      <Container className='navbar-container'>
        <Navbar.Brand href="#about" className='title-navbar'>
            <a href="https://petfly.io/"><img src={logo} alt="Logo" className="navbar-logo" /></a>
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="">
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;