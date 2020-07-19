import React from 'react';
import { Link } from 'react-router-dom'

// Estilos // 
import logo from '../assets/images/logo64.png';

// Utilidades //
import { useUser } from 'reactfire';

// Custom Hooks //
import UseLoginGoogle from '../hooks/UseLoginGoogle.js';
import UseSingoutGoogle from '../hooks/UseSingoutGoogle.js';



const NavBarComponent = () => {
     const user = useUser();
     const [googleAuth] = UseLoginGoogle();
     const [signOutGoogle] = UseSingoutGoogle();

     return (
          <>
               <nav className="navbar fixed-top navbar-dark bg-dark navbar-expand-lg">
                    <Link className="navbar-brand" to="/dashboard">
                         <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
                         SpiderTemplate
                     </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                         <ul className="navbar-nav text-center">
                              <li className="nav-item m-1">
                                   <Link className="btn btn-outline-secondary" to="/dashboard"><i className="fas fa-search" /> Buscar una plantilla</Link>
                              </li>
                              {user ?
                                   <li className="nav-item m-1">
                                        <Link className="btn btn-outline-secondary" to="/newtemplate"><i className="fas fa-file-code" /> Compartir una platilla</Link>
                                   </li>
                                   :
                                   <li className="nav-item m-1">
                                        <button className="btn btn-outline-secondary" onClick={() => { googleAuth() }}><i className="fas fa-file-code" /> Compartir una platilla</button>
                                   </li>
                              }

                              {user &&
                                   <>
                                        <li className="nav-item align-middle ml-5 m-1">
                                             <Link className="text-decoration-none" to="/dashboard/profile" data-toggle="tooltip" data-placement="right" title="Mi perfil">
                                                  <img src={user.photoURL} alt="perfil" style={{ width: "40px", borderRadius: "50%" }} />
                                                  <strong className="m-1 text-light">{user.displayName}</strong>
                                             </Link>

                                        </li>
                                        <li className="nav-item m-1">
                                             <a className="nav-link" onClick={() => { signOutGoogle() }}><i className="fas fa-sign-out-alt"></i></a>
                                        </li>
                                   </>
                              }
                         </ul>
                    </div>
               </nav>
               <div style={{ marginBottom: "70px" }}></div>
          </>
     );
}

export default NavBarComponent;