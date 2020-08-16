import React, { useState, useEffect } from 'react'
import { Redirect, useHistory, withRouter } from 'react-router-dom'

// Utilidades //
import { useUser } from 'reactfire';
import { useFirestore } from "reactfire";
import MUIDataTable from "mui-datatables";

// Custom Hooks //
import UseSingoutGoogle from '../../hooks/UseSingoutGoogle.js';

// Componentes //
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';



const ProfileComponent = () => {
     const history = useHistory();
     const firestore = useFirestore();
     const user = useUser();
     const [signOutGoogle] = UseSingoutGoogle();


     const [dataTemplate, setDataTemplates] = useState();

     useEffect(() => {
          if (user) {
               firestore().collection("templates").where("idUser", "==", user.uid)
                    .get()
                    .then(function (querySnapshot) {
                         const docs = [];
                         querySnapshot.forEach(function (doc) {
                              // doc.data() is never undefined for query doc snapshots
                              docs.push(doc.data());
                         });
                         setDataTemplates(docs);
                    })
                    .catch(function (error) {
                         console.log("Error getting documents: ", error);
                    });
          }
     }, [])

     const options = {
          filterType: 'checkbox',
          responsive: "standard",
          download: false,
          print: false,
          selectableRowsHeader: false,
          selectableRowsHideCheckboxes: true,
          viewColumns: false,
          onRowClick: function (rowData) {
               const id = rowData[7]
               history.push('profile/template=' + id)
          }
     };

     const columns = [
          {
               label: "FECHA EDICIÓN", name: "lastEditeCode", options: {
                    filter: false,
                    sort: true,
               }
          },
          {
               label: "CREADOR", name: "nameUser", options: {
                    filter: true,
                    sort: false,
               }
          },
          {
               label: "TITULO", name: "titleCode", options: {
                    filter: false,
                    sort: false,
               }
          },
          {
               label: "DESCRIPCIÓN", name: "descriptionCode", options: {
                    filter: false,
                    sort: false,
               }
          },
          {
               label: "CATEGORÍA", name: "categoryCode", options: {
                    filter: true,
                    sort: false,
               }
          },
          {
               label: "ATS", name: "atsCode", options: {
                    filter: true,
                    sort: false,
               }
          },
          {
               label: "UTILIZADO", name: "contCopy", options: {
                    filter: false,
                    sort: true,
               }
          },
          {
               label: "ID TEMPLATE", name: "idTemplate", options: {
                    display: 'false',
                    filter: false,
                    sort: false,
               }
          },
          {
               label: "FECHA CREACIÓN", name: "createDate", options: {
                    display: 'false',
                    filter: false,
                    sort: false,
               }
          },
          {
               label: "CÓDIGO FUENTE", name: "scriptCode", options: {
                    display: 'false',
                    filter: false,
                    sort: false,
               }
          }


     ];

     return (
          <>
               {user ?
                    <>
                         <NavBar />
                         <div className="container-fluid">
                              <div className="row">
                                   <div className="col-md-4 col-sm-12 my-5">
                                        <div className="container text-center">
                                             <img src={user.photoURL} style={{ borderRadius: "50%", width: "60%" }} alt="profile" />
                                             <h3 className="mt-3">{user.displayName}</h3>
                                             <strong className="subheader text-muted">{user.email}</strong>
                                             <p className="subheader text-muted">Ultimo inicio de sesión: {user.metadata.lastSignInTime}</p>
                                             <button type="button" onClick={() => { signOutGoogle() }} className="btn btn-outline-dark">Cerrar sesión <i className="fas fa-sign-out-alt" /></button>
                                        </div>
                                   </div>
                                   <div className="col-md-8 col-sm-12 my-5">
                                        <div className="alert alert-success text-center">
                                             ¡Actualiza tus plantillas, siempre se puede mejorar! ❤
                                   </div>
                                        <MUIDataTable
                                             title={"MIS PLANTILLAS"}
                                             data={dataTemplate}
                                             columns={columns}
                                             options={options}
                                        />
                                   </div>
                              </div>
                         </div>
                         <Footer />
                    </>
                    :
                    <Redirect to="/dashboard" />
               }

          </>
     );
}

export default withRouter(ProfileComponent);