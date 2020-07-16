import React, { useState } from 'react';

// Utilidades //
import CodeMirror from 'react-codemirror';
import { useForm } from "react-hook-form";
import moment from 'moment';
import Swal from 'sweetalert2';


// Componentes //
import Footer from '../components/Footer'

const FormNewTemplate = ({ onSubmitNewTemplate }) => {

     const optionsCodeMirror = {
          lineNumbers: true,
          mode: 'javascript',
          theme: 'material-ocean',
     };
     const { register, handleSubmit, errors } = useForm();
     const dateNow = moment().format('L');

     const stateInitial = {
          idTemplate: "",
          idUser: "",
          titleCode: "",
          categoryCode: "Otro",
          descriptionCode: "",
          atsCode: "Otro",
          scriptCode: "",
          lastEditeCode:dateNow,
          createDate: dateNow
     }

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
                              <label className="text-muted" htmlFor="validationStep">Categoria</label>
                              <select className="custom-select" id="validationStep"
                               value={dataInputs.categoryCode}
                                   onChange={(event) => {
                                        setDataInputs({
                                             ...dataInputs,
                                             categoryCode: event.target.value
                                        })
                                   }}
                              >
                                   <option>Extrac</option>
                                   <option>Pagination</option>
                                   <option>Jobdata</option>
                                   <option>Función</option>
                                   <option selected >Otro</option>
                              </select>
                         </div>
                    </div>
                    <div className="form-row my-3">
                         <div className="form-group col-md-6 col-sm-12">
                              <label className="text-muted" htmlFor="inputDescription">Descripción del código*</label>
                              <input type="text" className="form-control" id="inputDescription" placeholder="Función para extraer fechas de formato texto en idioma Frances"
                                 value={dataInputs.descriptionCode}
                                  name="inputDescription"
                                   ref={register({ required: true })}
                                   onChange={(event) => {
                                        setDataInputs({
                                             ...dataInputs,
                                             descriptionCode: event.target.value
                                        })
                                   }}
                              />
                              {errors.inputDescription && <span style={{ fontSize: "12px" }} className="text-danger">Este campo es obligatorio</span>}
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
                                   <option selected >Otro</option>
                              </select>
                         </div>
                    </div>
                    <div className="form-row my-3">
                         <div className="col-md-12 col-sm-12">
                              <p className="text-muted" htmlFor="validationCode">Código fuente*</p>
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
                    <div className="form-row my-3 float-right">
                         <button className="btn btn-secondary"><i className="fas fa-file-code" /> Compartir</button>
                    </div>
               </form>
               <Footer />
          </>
     );
}

export default FormNewTemplate;