import { useHistory } from 'react-router-dom';

// Utilidades //
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth'

// Estilos // 
import Swal from 'sweetalert2';



export default function UseSingoutGoogle() {
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
               })
               .catch(function (err) {
                    // An error happened.
                    console.error(err)
                    Swal.fire({
                         position: 'center',
                         icon: 'error',
                         title: 'Algo a salido mal, intenta de nuevo',
                         showConfirmButton: false,
                         timer: 1500
                    })
               });
     }

     return [signOutGoogle];
};

