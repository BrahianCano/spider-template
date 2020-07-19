import { useState } from "react";

// Utilidades //
import { useFirestore } from "reactfire";
import "firebase/firebase-firestore";

const UseGetDocFirestore = () => {
  const firestore = useFirestore();
  const [data, setData] = useState({
    response: {},
    success: false,
    error: null,
    loading: true,
  });

  const getDocCollection = async (collection, id) => {
    try {
      const doc = await firestore().collection(collection).doc(id).get();
      setData({ ...data, response: doc.data(), success: true, loading: false });
    } catch (err) {
      console.error(err);
      setData({ ...data, success: false, loading: false, error: err });
    }
  };

  return [data, getDocCollection];
};

export default UseGetDocFirestore;
