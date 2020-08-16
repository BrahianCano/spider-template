import React from 'react';
import { Link } from 'react-router-dom';

// Estilos //
import './index.css';

// Imagenes //
import imagen from '../../assets/images/globes.svg';

// Componentes //
import Footer from '../../components/Footer.jsx';

// Utilidades //
import { useUser } from 'reactfire';

// Custom Hooks //
import UseLoginGoogle from '../../hooks/UseLoginGoogle.js';



const ErrorComponent = () => {
     const user = useUser();
     const [googleAuth] = UseLoginGoogle();

     return (
          <>
               <div className="container-fluid page-error">
                    <div className="row">
                         <div className="col-md-5">
                              <h1>Esta pagina no esta disponible</h1>
                              {user &&
                                   <p className="lead">Esta pagina no existe, por favor verifica la URL.</p>
                              }
                              {!user &&
                                   <p className="lead">Tienes que iniciar sesión para acceder a esta pagina.</p>
                              }
                              {!user &&
                                   <button className="btn btn-secondary"
                                        onClick={() => { googleAuth() }}
                                   ><i className="fab fa-google" /> Iniciar sesión</button>
                              }
                              {user &&
                                   <Link className="btn btn-outline-dark" to="/dashboard/search"><i className="fas fa-arrow-left" /> Regresar</Link>
                              }

                         </div>
                         <div className="col-md-7">
                              <img src={imagen} alt="error page" style={{ width: "95%" }} />
                         </div>
                    </div>
               </div>
               <Footer />
          </>
     );
}

export default ErrorComponent;