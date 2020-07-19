import React, { useEffect, useState } from 'react'
import { useParams, withRouter, useHistory } from 'react-router-dom'

// Custom Hooks //
import UseGetDocFirestore from '../../hooks/UseGetDocFirestore.js';
import UseSetCollectionFirestore from '../../hooks/UseSetCollectionFirestore.js';


// Utilidades //
import { useForm } from "react-hook-form";
import { useUser } from 'reactfire';
import moment from 'moment';


// Componentes //
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ViewCode from '../../components/ViewCode'


const UpdateComponent = () => {
     const history = useHistory();
     const user = useUser();
     const { id } = useParams();
     const dateNow = moment().format('ll');

     const [data, getDocCollection] = UseGetDocFirestore();
     const [dataUpdate, setDocCollection] = UseSetCollectionFirestore();
     const { register, handleSubmit, errors } = useForm();

     const [dataInputs, setDataInputs] = useState({});
     const [permissions, setPermissions] = useState();

     useEffect(() => {
          getDocCollection('templates', id);
     }, []);


     useEffect(() => {
          setDataInputs(data.response);
     }, [data.response]);


     useEffect(() => {
          if (user && user.uid === data.response.idUser) {
               setPermissions(true)
          }
     }, [data.response.idUser]);


     const onChange = (value) => {
          setDataInputs({ ...dataInputs, scriptCode: value });
     }

     const onSubmit = () => {
          const dataTemplate = {
               ...dataInputs,
               lastEditeCode: dateNow
          }
          setDocCollection('templates', dataTemplate.idTemplate, dataTemplate);
     };

     if (dataUpdate.success === true) {
          history.push('/dashboard/profile');
     }


     return (
          <>
               {permissions ?
                    <>
                         <NavBar />
                         <div className="container-fluid">
                              <div className="row py-5">
                                   <div className="col-md-7 col-sm-12">
                                        <div className="container">
                                             <h2 className="mb-5">ULTIMA VERSIÓN</h2>
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
                                                                 <div className="p-1 flex-fill bd-highlight" style={{ width: "90%" }}>
                                                                      <p className="text-muted" htmlFor="validationCode">CÓDIGO FUENTE</p>
                                                                 </div>
                                                            </div>
                                                            {
                                                                 data.response.scriptCode !== undefined && <ViewCode data={data.response} onChange={onChange} readOnly={false} />
                                                            }

                                                       </div>
                                                  </div>
                                                  <div className="form-row my-2 float-right">
                                                       <button className="btn btn-secondary" style={{ width: "180px" }}><i className="fas fa-edit" /> Actualizar</button>
                                                  </div>
                                             </form>
                                        </div>
                                   </div>
                                   <div className="col-md-5 col-sm-12">
                                        <div className="container text-center">
                                             <h2>DATOS DEL CÓDIGO</h2>
                                             <div className="card my-2 shadow bg-white rounded mt-5" style={{ width: "90%" }}>
                                                  <div className="card-body">
                                                       <h3 className="card-title">{data.response.titleCode}</h3>
                                                       <h5 className="card-subtitle mb-2 text-muted">{data.response.nameUser}</h5>
                                                       <h6 className="card-subtitle mb-2 text-muted">Fecha creación: {data.response.createDate}</h6>
                                                       <h6 className="card-subtitle mb-2 text-muted">Ultima fecha edición: {data.response.lastEditeCode}</h6>
                                                       <div>
                                                            <span className="badge badge-success mx-1" style={{ fontSize: "15px" }}>{data.response.categoryCode}</span>
                                                            <span className="badge badge-warning mx-1" style={{ fontSize: "15px" }}>{data.response.atsCode}</span>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                              </div>
                         </div>
                         <Footer />
                    </>
                    :
                    <p>DEBES INICIAR SESIÓN CON EL RESPECTIVO CREADOR PARA ACTUALIZAR ESTE CÓDIGO</p>
               }
          </>
     );
}

export default withRouter(UpdateComponent);