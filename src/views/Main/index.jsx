import React from 'react'

// Utilidades //
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import Swal from 'sweetalert2';

// Estilos //
import './index.css'
import logo from '../../assets/images/logo128.png'

// Componentes //
import Footer from '../../components/Footer.jsx'

const MainComponent = () => {
     const firebase = useFirebaseApp();

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
                    console.log(result);
               })
               .catch((err) => {
                    Swal.fire({
                         position: 'center',
                         icon: 'error',
                         title: 'Algo a salido mal, intenta de nuevo',
                         showConfirmButton: false,
                         timer: 1500
                    })
                    console.log(err)
               })
     }


     return (
          <>
               <div className="main">
                    <img className="main-logo figure-img img-fluid" src={logo} alt="logo" />
                    <h1>Spider Template</h1>
                    <p className="lead">¡Comparte tus plantillas y codigos con las comunidad!</p>
                    <h4 className="mb-2" >¿Que deseas hacer?</h4>
                    <div className="row">

                         <div className="col-sm-12 col-md-12 mb-2">
                              <button type="button" className="btn btn-success"
                                   onClick={() => { loginWithGoogle() }}
                              ><i className="fas fa-file-code" /> Compartir una plantilla</button>
                         </div>
                         <div className="col-sm-12 col-md-12">
                              <button type="button" className="btn btn-dark"><i className="fas fa-search" /> Buscar una plantilla</button>
                         </div>
                    </div>

               </div>
               <Footer />
          </>
     );
}

export default MainComponent;