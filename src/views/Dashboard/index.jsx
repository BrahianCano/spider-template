import React, { useEffect, useState } from 'react'

// Utilidades //
import MUIDataTable from "mui-datatables";

import { useFirestore } from 'reactfire';
import 'firebase/firebase-firestore';

// Componentes //
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';


const DashboardComponent = () => {
     const firestore = useFirestore();

     const [dataTemplates, setDataTemplates] = useState([]);

     useEffect(() => {
          getTemplates()
     }, [])

     const getTemplates = () => {
          firestore()
               .collection("templates")
               .onSnapshot((querySnapshot) => {
                    const docs = [];
                    querySnapshot.forEach(function (doc) {
                         docs.push(doc.data());
                    });
                    setDataTemplates(docs);
                    //console.log(docs)
               });
     }

     const options = {
          filterType: 'checkbox',
          responsive: "standard",
     };

     const columns = [
          { label: "createDate", name: "createDate" },
          { label: "lastEditeCode", name: "lastEditeCode" },
          { label: "titleCode", name: "titleCode" },
          { label: "descriptionCode", name: "descriptionCode" },
          { label: "categoryCode", name: "categoryCode" },
          { label: "atsCode", name: "atsCode" },
          {
               label: "scriptCode", name: "scriptCode", options: {
                    display: 'false'
               }
          },
          {
               label: "idUser", name: "idUser", options: {
                    display: 'false'
               }
          },
          {
               label: "idTemplate", name: "idTemplate", options: {
                    display: 'false'
               }
          }

     ];

     return (
          <div>
               <NavBar />
               <div className="m-3 my-5">
                    <div class="alert alert-primary" role="alert">
                         ¡Comparte tus plantillas y códigos con las comunidad!
                    </div>
               </div>
               <MUIDataTable
                    title={"PLANTILLAS COMPARTIDAS"}
                    data={dataTemplates}
                    columns={columns}
                    options={options}
               />
               <Footer />
          </div>
     );
}

export default DashboardComponent;