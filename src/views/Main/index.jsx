import React from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'

// Utilidades //
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';
import Swal from 'sweetalert2';

// Estilos //
import './index.css'
import logo from '../../assets/images/logo128.png'

// Componentes //
import Footer from '../../components/Footer.jsx'

const MainComponent = () => {
     const firebase = useFirebaseApp();
     const history = useHistory();
     const user = useUser();

     const loginWithGoogle = () => {
          let provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider)
               .then((result) => {
                    Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: 'Bienvenido ' + result.user.displayName,
                         showConfirmButton: false,
                         timer: 1500
                    })
                    history.push('/newtemplate');
                    // console.log(result);
               })
               .catch((err) => {
                    Swal.fire({
                         position: 'center',
                         icon: 'error',
                         title: 'Algo a salido mal, intenta de nuevo',
                         showConfirmButton: false,
                         timer: 1500
                    })
                    console.error(err)
               })
     }

     return (
          <>
               {!user ?
                    <>
                         <div className="main">
                              <img className="main-logo figure-img img-fluid" src={logo} alt="logo" />
                              <h1>SpiderTemplate</h1>
                              <p className="lead">¡Comparte tus plantillas y codigos con las comunidad!</p>
                              <h4 className="mb-2" >¿Que deseas hacer?</h4>
                              <div className="row">

                                   <div className="col-sm-12 col-md-12 mb-2">
                                        <Link type="button" className="btn btn-secondary"
                                             onClick={() => { loginWithGoogle() }}
                                        ><i className="fas fa-file-code" /> Compartir una plantilla</Link>
                                   </div>
                                   <div className="col-sm-12 col-md-12">
                                        <Link type="button" to="/dashboard" className="btn btn-dark"><i className="fas fa-search" /> Buscar una plantilla</Link>
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