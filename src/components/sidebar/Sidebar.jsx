import logo from '../img/Logo.jpeg'
import './sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
    <img src={logo} alt="Logo de la empresa" />
    </div>  
  )
}

export default Sidebar