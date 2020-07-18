import React, { useState } from "react";

// Utilidades //
import { useFirestore } from "reactfire";
import "firebase/firebase-firestore";

import Swal from "sweetalert2";

const UseSetCollectionFirestore = () => {
  const firestore = useFirestore();
  const [data, setData] = useState({
    success: false,
    error: null,
    loading: true,
  });

  const setDocCollection = async (collection, id, data) => {
    try {
      await firestore().collection(collection).doc(id).set(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Subida exitosa",
        showConfirmButton: false,
        timer: 1200,
      });
      setData({ ...data, success: true, loading: false });
    } catch (err) {
      console.error(err);
      setData({ ...data, success: false, loading: false, error: err });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Algo a salido mal, intenta de nuevo",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  return [data, setDocCollection];
};

export default UseSetCollectionFirestore;
