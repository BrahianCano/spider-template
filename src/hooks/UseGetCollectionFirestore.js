import React, { useState } from "react";

// Utilidades //
import { useFirestore } from "reactfire";
import "firebase/firebase-firestore";

const UseGetCollectionFirestore = () => {
  const firestore = useFirestore();
  const [data, setData] = useState([]);

  const getCollection = (collection) => {
    firestore()
      .collection(collection)
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach(function (doc) {
          docs.push(doc.data());
        });
        setData(docs);
        //console.log(docs)
      });
  };
  return [data, getCollection];
};

export default UseGetCollectionFirestore;
