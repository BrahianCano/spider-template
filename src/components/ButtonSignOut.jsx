import React from 'react';
import { useHistory } from 'react-router-dom'

// Utilidades //
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth'

// Estilos // 
import Swal from 'sweetalert2';

const ButtonSingOutComponent = () => {
     const firebase = useFirebaseApp();
     const history = useHistory();

     const signOutGoogle = () => {
          firebase.auth().signOut()
               .then(function () {
                    // Sign-out successful.
                    Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: 'Sesión cerrada con exito',
                         showConfirmButton: false,
                         timer: 1500
                    })
                    history.push('/');
               }).catch(function (err) {
                    // An error happened.
                    Swal.fire({
                         position: 'center',
                         icon: 'error',
                         title: 'Algo a salido mal, intenta de nuevo',
                         showConfirmButton: false,
                         timer: 1500
                    })
                    console.error(err)
               });
     }

     return (
          <>
               <a className="nav-link" onClick={() => { signOutGoogle() }}><i className="fas fa-sign-out-alt"></i></a>
          </>
     );
}

export default ButtonSingOutComponent;