import React, { useState, useEffect, useMemo } from 'react'
import { useParams, withRouter } from 'react-router-dom'

// Estilos //
import './index.css'

// Utilidades //
import { useFirestore } from "reactfire";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2'

// Componentes //
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ViewCode from '../../components/ViewCode'


const ViewTemplateComponent = () => {
     const { id } = useParams();
     const firestore = useFirestore();

     const [data, setData] = useState({});

     const getDataTemplate = async () => {
          const doc = await firestore().collection('templates').doc(id).get()
          setData(doc.data());
     }

     useMemo(() => {
          getDataTemplate();
     }, [])


     return (
          <>
               <NavBar />
               <div className="view-template-main container-fluid">
                    <div className="container">
                         <h2>{data.titleCode}</h2>
                         <h6 className="card-subtitle mb-2 text-muted">{data.nameUser} - {data.lastEditeCode}</h6>
                         <p className="lead">{data.descriptionCode}</p>
                         <div>
                              <span className="badge badge-success mx-1" style={{ fontSize: "15px" }}>{data.categoryCode}</span>
                              <span className="badge badge-warning mx-1" style={{ fontSize: "15px" }}>{data.atsCode}</span>
                         </div>
                    </div>
               </div>
               <div className="container">
                    <div className="card my-2 shadow bg-white rounded" style={{ width: "100%" }}>
                         <div className="card-body">
                              <div className="d-flex bd-highlight">
                                   <div className="p-1 flex-fill bd-highlight" style={{ width: "90%" }}>
                                        <p className="text-muted" htmlFor="validationCode">CÓDIGO FUENTE</p>
                                   </div>
                                   <div className="p-1 flex-fill bd-highlight">
                                        <CopyToClipboard text={data.scriptCode}
                                             onCopy={() => {
                                                  Swal.fire({
                                                       position: "center",
                                                       icon: "success",
                                                       title: "Código copiado",
                                                       showConfirmButton: false,
                                                       timer: 800,
                                                     });
                                             }}>
                                             <button className="btn btn-secondary btn-sm" data-toggle="tooltip" data-placement="top" title="Copiar codigo"> <i className="far fa-copy" /> Copiar</button>
                                        </CopyToClipboard>
                                   </div>
                              </div>
                              {
                                   data.scriptCode !== undefined && <ViewCode data={data} />
                              }

                         </div>
                    </div>

               </div>
               <Footer />
          </>
     );
}

export default withRouter( ViewTemplateComponent);

