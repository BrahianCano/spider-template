import { useState } from "react";
import { useFirestore } from "reactfire";



export default function UseGetCollectionFirestore() {
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
