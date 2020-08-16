import React from 'react'
import { Link, Redirect } from 'react-router-dom'

// Estilos //
import './index.css'
import logo from '../../assets/images/logo128.png'

// Utilidades //
import { useUser } from 'reactfire';

// Custom Hooks //
import UseLoginGoogle from '../../hooks/UseLoginGoogle.js';

// Componentes //
import Footer from '../../components/Footer.jsx'



const MainComponent = () => {
     const user = useUser();
     const [googleAuth] = UseLoginGoogle();


     return (
          <>
               {!user ?
                    <>
                         <div className="main">
                              <img className="main-logo figure-img img-fluid" src={logo} alt="logo" />
                              <h1>SpiderTemplate</h1>
                              <p className="lead">¡Comparte tus plantillas y códigos con la comunidad!</p>
                              <h4 className="mb-2" >¿Que deseas hacer?</h4>
                              <div className="row">

                                   <div className="col-sm-12 col-md-12 mb-2">
                                        <a type="button" className="btn btn-secondary"
                                             onClick={() => { googleAuth() }}
                                        ><i className="fas fa-file-code" /> Compartir una plantilla</a>
                                   </div>
                                   <div className="col-sm-12 col-md-12">
                                        <Link type="button" to="/dashboard/search" className="btn btn-dark"><i className="fas fa-search" /> Buscar una plantilla</Link>
                                   </div>
                              </div>

                         </div>
                         <Footer />
                    </>
                    :
                    <Redirect to="/newtemplate" />
               }

          </>
     );
}

export default MainComponent;