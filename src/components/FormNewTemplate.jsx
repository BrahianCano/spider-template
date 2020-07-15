import React from 'react';

// Utilidades //
import CodeMirror from 'react-codemirror'

// Componentes //
import Footer from '../components/Footer'

const FormNewTemplate = () => {
     const optionsCodeMirror = {
          lineNumbers: true,
          mode: 'javascript',
          theme: 'material-ocean',
     };

     return (
          <>
               <form className="text-left my-1">
                    <div className="form-row my-3">
                         <div className="form-group col-md-6 col-sm-12">
                              <label className="text-muted" for="inputTitle">Titulo del código*</label>
                              <input type="text" class="form-control" id="inputTitle" placeholder="FECHA DE POSTEO EN ALEMAN" />
                         </div>
                         <div className="form-group col-md-6 col-sm-12">
                              <label className="text-muted" for="validationStep">Categoria</label>
                              <select class="custom-select" id="validationStep">
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
                              <label className="text-muted" for="inputDescription">Descripción del código*</label>
                              <input type="text" class="form-control" id="inputDescription" placeholder="Función para extraer fechas de meses atras en Aleman" />
                         </div>
                         <div className="form-group col-md-6 col-sm-12">
                              <label className="text-muted" for="validationStep">ATS</label>
                              <select class="custom-select" id="validationStep">
                                   <option>MYWORKDAY</option>
                                   <option>ADP</option>
                                   <option>ICIMS</option>
                                   <option selected >Otro</option>
                              </select>
                         </div>
                    </div>
                    <div className="form-row my-3">
                         <div className="col-md-12 col-sm-12">
                              <p className="text-muted" for="validationCode">Codigo fuente*</p>
                              <CodeMirror value="" options={optionsCodeMirror} onChange={(valueCode) => {
                                   console.log(valueCode)
                              }} />
                         </div>
                    </div>
                    <div className="form-row my-3">
                         <button className="btn btn-secondary">Compartir</button>
                    </div>
               </form>
               <Footer />
          </>
     );
}

export default FormNewTemplate;