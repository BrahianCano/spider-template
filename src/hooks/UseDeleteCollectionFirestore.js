import { useState } from "react";
import { useFirestore } from "reactfire";

// Estilos //
import Swal from "sweetalert2";

export default function UseSetCollectionFirestore() {
  const firestore = useFirestore();
  const [data, setData] = useState({
    success: false,
    error: null,
    loading: true,
  });

  const deleteDocCollection = async (collection, id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "¿Esta plantilla no se podra recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrarla!",
    })
      .then((result) => {
        if (result.value) {
          firestore().collection(collection).doc(id).delete()
            .then(function () {
              setData({ ...data, success: true, loading: false });
              Swal.fire("Borrada!", "Esta plantilla fue eliminada.", "success");
            })
            .catch(function (error) {
               console.error("Error removing document: ", error);
               setData({ error, success: false, loading: false });
             });
        }
      })
      
  };

  return [data, deleteDocCollection];
}
