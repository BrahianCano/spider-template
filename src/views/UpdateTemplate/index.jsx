import React, { useEffect, useState } from 'react'
import { useParams, withRouter, useHistory } from 'react-router-dom'

// Custom Hooks //
import UseGetDocFirestore from '../../hooks/UseGetDocFirestore.js';
import UseSetCollectionFirestore from '../../hooks/UseSetCollectionFirestore.js';
import UseDeleteCollectionFirestore from '../../hooks/UseDeleteCollectionFirestore.js';


// Utilidades //
import { useForm } from "react-hook-form";
import { useUser } from 'reactfire';
import moment from 'moment';


// Componentes //
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ViewCode from '../../components/ViewCode';
import Error from '../../pages/ErrorPage/index.jsx';

// Estilos //
import Swal from 'sweetalert2';



const UpdateComponent = () => {
     const history = useHistory();
     const user = useUser();
     const { id } = useParams();
     const dateNow = moment().format('ll');

     const [data, getDocCollection] = UseGetDocFirestore();
     const [dataDelete, deleteDocCollection] = UseDeleteCollectionFirestore();
     const [dataUpdate, setDocCollection] = UseSetCollectionFirestore();
     const { register, handleSubmit, errors } = useForm();

     const [dataInputs, setDataInputs] = useState({});
     const [permissions, setPermissions] = useState(false);

     useEffect(() => {
          getDocCollection('templates', id);
     }, []);


     useEffect(() => {
          setDataInputs(data.response);
     }, [data.response]);


     useEffect(() => {
          if (dataDelete.success == true) {
               history.push('/dashboard/profile');
          }
     }, [dataDelete.success]);


     useEffect(() => {
          if (data.response !== undefined) {
               if (user && user.uid === data.response.idUser) {
                    setPermissions(true)
               }
          }
     }, [data.response]);


     const onChange = (value) => {
          setDataInputs({ ...dataInputs, scriptCode: value });
     }

     const onSubmit = () => {
          if (dataInputs.scriptCode.length > 0) {
               const dataTemplate = { ...dataInputs, lastEditeCode: dateNow }
               setDocCollection('templates', dataTemplate.idTemplate, dataTemplate);
          } else {
               Swal.fire({
                    position: 'center',
                    icon: 'question',
                    title: '¿Y tu código?',
                    showConfirmButton: false,
                    timer: 1500
               })
          }

     };

     if (dataUpdate.success) history.push('/dashboard/profile');

     return (
          <>
               {permissions ?
                    <>
                         <NavBar />
                         <div className="container-fluid">
                              <div className="row py-5">
                                   <div className="col-md-7 col-sm-12">
                                        <div className="container">
                                             <h2 className="mb-5">NUEVA VERSIÓN</h2>
                                             <form onSubmit={handleSubmit(onSubmit)}>
                                                  <div className="form-row my-2">
                                                       <div className="form-group col-md-12 col-sm-12">
                                                            <label className="text-muted" htmlFor="inputDescriptionUpdate">Descripción del código*</label>
                                                            <input type="text" className="form-control" id="inputDescriptionUpdate" placeholder=""
                                                                 value={dataInputs.descriptionCode}
                                                                 name="inputDescriptionUpdate"
                                                                 ref={register({ required: true, maxLength: 90 })}
                                                                 onChange={(event) => {
                                                                      setDataInputs({ ...dataInputs, descriptionCode: event.target.value })
                                                                 }}
                                                            />
                                                            {errors.inputDescriptionUpdate?.type === "required" && <span style={{ fontSize: "12px" }} className="text-danger">Este campo es obligatorio</span>}
                                                            {errors.inputDescriptionUpdate?.type === "maxLength" && <span style={{ fontSize: "12px" }} className="text-danger">Solo se permite un maximo de 90 caracteres.</span>}
                                                       </div>
                                                  </div>
                                                  <div className="card my-2 shadow bg-white rounded" style={{ width: "100%" }}>
                                                       <div className="card-body">
                                                            <div className="d-flex bd-highlight">
                                                                 <div className="flex-fill bd-highlight" style={{ width: "90%" }}>
                                                                      <p className="text-muted" htmlFor="validationCode">Código fuente*</p>
                                                                 </div>
                                                            </div>
                                                            {
                                                                 data.response.scriptCode !== undefined && <ViewCode data={data.response} onChange={onChange} readOnly={false} />
                                                            }

                                                       </div>
                                                  </div>
                                                  <div className="form-row my-2 float-right">
                                                       <button className="btn btn-secondary" style={{ width: "180px" }}>Actualizar <i className="fas fa-edit" /></button>
                                                  </div>
                                             </form>
                                        </div>
                                   </div>
                                   <div className="col-md-5 col-sm-12">
                                        <div className="container text-center">
                                             <h2>DATOS DE LA PLANTILLA</h2>
                                             <div className="card my-2 shadow bg-white rounded mt-5" style={{ width: "100%" }}>
                                                  <div className="card-body">
                                                       <h2 className="card-title">{data.response.titleCode}</h2>
                                                       <h5 className="card-subtitle mb-3 text-muted">{data.response.nameUser}</h5>
                                                       <hr />
                                                       <h6 className="mb-3 text-muted"><b>Fecha creación:</b> {data.response.createDate}</h6>
                                                       <h6 className="mb-3 text-muted"><b>Ultima fecha edición:</b> {data.response.lastEditeCode}</h6>
                                                       <h6 className="mb-3 text-muted"><b>Fue utilizado:</b> {data.response.contCopy} veces.</h6>
                                                       <hr />
                                                       <div>
                                                            <h6 className="card-subtitle mb-3">Clasificación</h6>
                                                            <span className="badge badge-info mx-1" style={{ fontSize: "15px" }}>{data.response.categoryCode}</span>
                                                            <span className="badge badge-warning mx-1" style={{ fontSize: "15px" }}>{data.response.atsCode}</span>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="border border-danger p-3 rounded">
                                                  <h3 className="text-danger">ZONA DE PELIGRO <i className="fas fa-exclamation-triangle" /></h3>
                                                  <hr className="text-danger" />
                                                  <h4 className="mt-5" >Elimina esta plantilla</h4>
                                                  <p className="my-1 text-muted">Una vez que elimine esta plantilla, no hay vuelta atrás. Por favor, esté seguro.</p>
                                                  <button type="button" className="btn btn-danger my-1"
                                                       onClick={() => { deleteDocCollection('templates', id) }}>Eliminar <i className="fas fa-trash-alt" /></button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <Footer />
                    </>
                    :
                    <Error />
               }
          </>
     );
}

export default withRouter(UpdateComponent);