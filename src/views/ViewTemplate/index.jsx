import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';

// Estilos //
import './index.css'

// Utilidades //
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';

// Custom Hooks //
import UseGetDocFirestore from '../../hooks/UseGetDocFirestore.js';
import UseSetCollectionFirestore from '../../hooks/UseSetCollectionFirestore.js';

// Componentes //
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ViewCode from '../../components/ViewCode';



const ViewTemplateComponent = () => {
     const { id } = useParams();
     const [data, getDocCollection] = UseGetDocFirestore();
     const [dataUpdate, setDocCollection] = UseSetCollectionFirestore();
     //const [contUpdate, setContUpdate] = useState(0);

     useEffect(() => {
          getDocCollection('templates', id);
     }, [])


     useEffect(() => {
          if (dataUpdate.success) Swal.fire({ position: "center", icon: "success", title: "Código copiado", showConfirmButton: false, timer: 800 });
     }, [dataUpdate.success]);


     const utilityCode = () => {
          let countFirebase = parseInt(data.response.contCopy);
          countFirebase = countFirebase += 1;

          setDocCollection('templates', data.response.idTemplate, { ...data.response, contCopy: countFirebase });
     }


     return (
          <>
               {
                    data.response ?
                         <>
                              <NavBar />
                              <div className="view-template-main container-fluid">
                                   <div className="container">
                                        <div className="row">
                                             <div className="col-md-7 col-sm-12">
                                                  <h1>{data.response.titleCode}</h1>
                                                  <h6 className="card-subtitle mb-2 text-muted">{data.response.nameUser} - {data.response.lastEditeCode}</h6>
                                                  <p className="lead">{data.response.descriptionCode}</p>
                                                  <div>
                                                       <span className="badge badge-info mx-1" style={{ fontSize: "15px" }}>{data.response.categoryCode}</span>
                                                       <span className="badge badge-warning mx-1" style={{ fontSize: "15px" }}>{data.response.atsCode}</span>
                                                  </div>
                                             </div>
                                             <div className="col-md-5 col-sm-12">
                                                  <h2 className="mb-3"><i className="fas fa-star"></i> Popularidad </h2>
                                                  <div className="badge badge-success mb-3" style={{ fontSize: "1.1rem" }}>
                                                       Este código ha sido utilizado : {data.response.contCopy} veces!
                                                  </div>
                                                  <div>
                                                       <CopyToClipboard text={window.location.href}
                                                            onCopy={() => {
                                                                 Swal.fire({
                                                                      position: "center",
                                                                      icon: "success",
                                                                      title: "Enlace copiado",
                                                                      showConfirmButton: false,
                                                                      timer: 900,
                                                                 });
                                                            }}>
                                                            <button type="button" className="btn btn-dark btn-sm">Copiar enlace  <i className="fas fa-link" /></button>
                                                       </CopyToClipboard>
                                                  </div>
                                             </div>
                                        </div>

                                   </div>

                              </div>
                              <div className="container">
                                   <div className="card my-2 shadow bg-white rounded" style={{ width: "100%" }}>
                                        <div className="card-body">
                                             <div className="d-flex bd-highlight">
                                                  <div className="p-1 flex-fill bd-highlight" style={{ width: "85%" }}>
                                                       <p className="text-muted" htmlFor="validationCode">CÓDIGO FUENTE</p>
                                                  </div>
                                                  <div className="p-1 flex-fill bd-highlight">
                                                       <CopyToClipboard text={data.response.scriptCode}
                                                            onCopy={() => utilityCode()}>
                                                            <button className="btn btn-secondary btn-sm">Copiar codigo <i className="fas fa-code" /></button>
                                                       </CopyToClipboard>
                                                  </div>
                                             </div>
                                             {
                                                  data.response.scriptCode !== undefined && <ViewCode data={data.response} readOnly={true} />
                                             }

                                        </div>
                                   </div>

                              </div>
                              <Footer />
                         </>
                         :
                         <p>ESTA PLANTILLA NO EXISTE, VERIFICA BIEN EN ENLACE</p>
               }
          </>

     );
}

export default withRouter(ViewTemplateComponent);

