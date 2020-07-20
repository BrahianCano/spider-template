import { useHistory } from "react-router-dom";

// Utilidades //
import { useFirebaseApp } from "reactfire";
import "firebase/auth";

// Estilos //
import Swal from "sweetalert2";



export default function UseLoginGoogle() {
      const firebase = useFirebaseApp();
      const history = useHistory();

        const googleAuth = () => {
          let provider = new firebase.auth.GoogleAuthProvider();
          firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
              // Login successful.
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Bienvenido " + result.user.displayName,
                showConfirmButton: false,
                timer: 1500,
              });
              history.push("/newtemplate");
            })
            .catch(function (err) {
              // An error happened.
              console.error(err);
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo a salido mal, intenta de nuevo",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        };


  return [googleAuth];
};

