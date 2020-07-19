import React, { useEffect } from 'react'
import { useParams, withRouter } from 'react-router-dom'

// Estilos //
import './index.css'

// Utilidades //
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';

// Custom Hooks //
import UseGetDocFirestore from '../../hooks/UseGetDocFirestore.js';

// Componentes //
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ViewCode from '../../components/ViewCode'


const ViewTemplateComponent = () => {
     const { id } = useParams();
     const [data, getDocCollection] = UseGetDocFirestore();

     useEffect(() => {
          getDocCollection('templates', id);
     }, [])

     return (
          <>
               <NavBar />
               <div className="view-template-main container-fluid">
                    <div className="container">
                         <h2>{data.response.titleCode}</h2>
                         <h6 className="card-subtitle mb-2 text-muted">{data.response.nameUser} - {data.response.lastEditeCode}</h6>
                         <p className="lead">{data.response.descriptionCode}</p>
                         <div>
                              <span className="badge badge-success mx-1" style={{ fontSize: "15px" }}>{data.response.categoryCode}</span>
                              <span className="badge badge-warning mx-1" style={{ fontSize: "15px" }}>{data.response.atsCode}</span>
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
                                        <CopyToClipboard text={data.response.scriptCode}
                                             onCopy={() => {
                                                  Swal.fire({
                                                       position: "center",
                                                       icon: "success",
                                                       title: "Código copiado",
                                                       showConfirmButton: false,
                                                       timer: 800,
                                                     });
                                             }}>
                                             <button className="btn btn-secondary btn-sm"> <i className="far fa-copy" /> Copiar</button>
                                        </CopyToClipboard>
                                   </div>
                              </div>
                              {
                                   data.response.scriptCode !== undefined && <ViewCode data={data.response} />
                              }

                         </div>
                    </div>

               </div>
               <Footer />
          </>
     );
}

export default withRouter( ViewTemplateComponent);

