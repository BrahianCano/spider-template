import React from 'react';
import { Link } from 'react-router-dom'

// Utilidades //
import { useUser } from 'reactfire';

// Estilos // 
import logo from '../assets/images/logo64.png';

// Componentes //
import ButtonSingOut from '../components/ButtonSignOut.jsx'

const NavBarComponent = () => {
     const user = useUser();

     return (
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
               <Link className="navbar-brand" to="/">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
                    SpiderTemplate
               </Link>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav text-center">
                         <li className="nav-item m-1">
                              <a className="btn btn-outline-secondary" href="#"><i className="fas fa-search" /> Buscar una plantilla</a>
                         </li>
                         <li className="nav-item m-1">
                              <a className="btn btn-outline-secondary" href="#"><i className="fas fa-file-code" /> Compartir una platilla</a>
                         </li>
                         {user &&
                              <>
                                   <li className="nav-item align-middle ml-5 m-1">
                                        <img src={user.photoURL} alt="perfil" style={{ width: "40px", borderRadius: "50%" }} />
                                        <strong className="m-1 text-light">{user.displayName}</strong>
                                   </li>
                                   <li className="nav-item m-1">
                                        <ButtonSingOut />
                                   </li>
                              </>
                         }
                    </ul>


               </div>
          </nav>
     );
}

export default NavBarComponent;