import { useState } from "react";
import { useFirestore } from "reactfire";



export default function UseGetDocFirestore() {
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

