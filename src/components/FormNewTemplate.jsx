import React, { useState } from 'react';

// Utilidades //
import CodeMirror from 'react-codemirror';
import { useForm } from "react-hook-form";
import moment from 'moment';

// Estilos //
import Swal from 'sweetalert2';



export default function FormNewTemplate({ onSubmitNewTemplate }) {
     const dateNow = moment().format('ll');

     const stateInitial = {
          idTemplate: "",
          nameUser: "",
          titleCode: "",
          categoryCode: "Otro",
          descriptionCode: "",
          atsCode: "Otro",
          scriptCode: "",
          lastEditeCode: dateNow,
          createDate: dateNow
     }
     const optionsCodeMirror = {
          lineNumbers: true,
          readOnly: false,
          mode: 'javascript',
          theme: 'material-ocean',
     };
     const { register, handleSubmit, errors } = useForm();
     const [dataInputs, setDataInputs] = useState(stateInitial);


     return (
          <>
               <form className="text-left my-1"
                    onSubmit={
                         handleSubmit(() => {
                              if (dataInputs.scriptCode.length > 0) {
                                   onSubmitNewTemplate(dataInputs);
                                   setDataInputs(stateInitial);
                              } else {
                                   Swal.fire({
                                        position: 'center',
                                        icon: 'question',
                                        title: '¿Y tu código?',
                                        showConfirmButton: false,
                                        timer: 1500
                                   })
                              }
                         })
                    }
               >
                    <div className="form-row my-3">
                         <div className="form-group col-md-6 col-sm-12">
                              <label className="text-muted" htmlFor="inputTitle">Titulo del código*</label>
                              <input type="text" className="form-control" id="inputTitle" placeholder="Fecha de posteo en frances"
                                   value={dataInputs.titleCode}
                                   name="inputTitle"
                                   ref={register({ required: true })}
                                   onChange={(event) => {
                                        setDataInputs({
                                             ...dataInputs,
                                             titleCode: event.target.value
                                        })
                                   }}
                              />
                              {errors.inputTitle && <span style={{ fontSize: "12px" }} className="text-danger">Este campo es obligatorio</span>}
                         </div>
                         <div className="form-group col-md-6 col-sm-12">
                              <label className="text-muted" htmlFor="validationStep">Categoría</label>
                              <select className="custom-select" id="validationStep"
                                   value={dataInputs.categoryCode}
                                   onChange={(event) => {
                                        setDataInputs({
                                             ...dataInputs,
                                             categoryCode: event.target.value
                                        })
                                   }}
                              >
                                   <option>Simple función</option>
                                   <option>Expresión regular</option>
                                   <option>Infinite pagination</option>
                                   <option>Expected jobs</option>
                                   <option>Before extrac</option>
                                   <option>Extrac</option>
                                   <option>Pagination</option>
                                   <option>Job description</option>
                                   <option defaultValue="Otro" >Otro</option>
                              </select>
                         </div>
                    </div>
                    <div className="form-row my-3">
                         <div className="form-group col-md-6 col-sm-12">
                              <label className="text-muted" htmlFor="inputDescription">Descripción del código*</label>
                              <input type="text" className="form-control" id="inputDescription" placeholder="Función para extraer fechas de formato texto en idioma Frances"
                                   value={dataInputs.descriptionCode}
                                   name="inputDescription"
                                   ref={register({ required: true, maxLength: 90 })}
                                   onChange={(event) => {
                                        setDataInputs({
                                             ...dataInputs,
                                             descriptionCode: event.target.value
                                        })
                                   }}
                              />
                              {errors.inputDescription?.type === "required" && <span style={{ fontSize: "12px" }} className="text-danger">Este campo es obligatorio</span>}
                              {errors.inputDescription?.type === "maxLength" && <span style={{ fontSize: "12px" }} className="text-danger">Solo se permite un maximo de 90 caracteres.</span>}
                         </div>
                         <div className="form-group col-md-6 col-sm-12">
                              <label className="text-muted" htmlFor="validationAts">ATS</label>
                              <select className="custom-select" id="validationAts"
                                   value={dataInputs.atsCode}
                                   onChange={(event) => {
                                        setDataInputs({
                                             ...dataInputs,
                                             atsCode: event.target.value
                                        })
                                   }}
                              >
                                   <option>MYWORKDAY</option>
                                   <option>ADP</option>
                                   <option>ICIMS</option>
                                   <option>JOBVITE</option>
                                   <option>GOVERMENTJOBS</option>
                                   <option>SUCCESSFACTORS</option>
                                   <option>WORKABLE</option>
                                   <option>TALEO</option>
                                   <option defaultValue="Otro" >Otro</option>
                              </select>
                         </div>
                    </div>
                    <div className="form-row my-3">
                         <div className="col-md-12 col-sm-12">
                              <div className="card my-2 shadow bg-white rounded" style={{ width: "100%" }}>
                                   <div className="card-body">
                                        <div className="d-flex bd-highlight">
                                             <div className="flex-fill bd-highlight" style={{ width: "90%" }}>
                                                  <p className="text-muted" htmlFor="validationCode">Código fuente*</p>
                                             </div>
                                        </div>
                                        <CodeMirror value={dataInputs.scriptCode} options={optionsCodeMirror}
                                             onChange={(valueCode) => {
                                                  setDataInputs({
                                                       ...dataInputs,
                                                       scriptCode: valueCode
                                                  })
                                             }}
                                        />
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="form-row my-2 float-right">
                         <button className="btn btn-secondary" style={{ width: "180px" }}>Compartir  <i class="fas fa-upload"/></button>
                    </div>
               </form>
          </>
     );
};

