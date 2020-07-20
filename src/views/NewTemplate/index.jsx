import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom';

// Utilidades //
import { useUser } from 'reactfire';
import uniqid from 'uniqid';

// Custom hooks //
import UseSetCollectionFirestore from '../../hooks/UseSetCollectionFirestore.js';
import UseGetCollectionFirestore from '../../hooks/UseGetCollectionFirestore.js';


// Componentes //
import NavBar from '../../components/NavBar';
import FormNewTemplate from '../../components/FormNewTemplate';
import Footer from '../../components/Footer';
import CardNews from '../../components/CardNews';



const NewTemplateComponent = () => {
     const history = useHistory();
     const user = useUser();
     const id = uniqid();

     const [data, setDocCollection] = UseSetCollectionFirestore();
     const [dataNews, getCollection] = UseGetCollectionFirestore();


     const onSubmitNewTemplate = (dataInputs) => {
          const dataTemplate = {
               ...dataInputs,
               nameUser: user.displayName,
               idTemplate: id,
               idUser: user.uid,
               contCopy : 0
          }
          setDocCollection('templates', dataTemplate.idTemplate, dataTemplate);
     }

     if (data.success) history.push('/dashboard');

     useEffect(() => {
          getCollection('news');
     }, [])

     return (
          <>{user ?
               <>
                    <NavBar />
                    <div className="container-fluid">
                         <div className="alert alert-success text-center mx-5" role="alert">
                              Llena lo campos requeridos y muéstrales a todos tu increíble código. ❤
                                    </div>
                         <div className="row">

                              <div className="col-md-7 col-sm-12 text-center mx-5 my-3">
                                   <h4 className="my-1">DATOS SOBRE TU PLANTILLA</h4>
                                   <FormNewTemplate onSubmitNewTemplate={onSubmitNewTemplate} />
                              </div>
                              <div className="col-md-4 col-sm-12 text-center my-2">
                                   <h4 className="my-2">SE AUTODIDACTA</h4>
                                   <div className="badge badge-warning text-wrap my-3" style={{ fontSize: "1rem", width: "80%" }}>
                                        Aquí encontraras contenido cada semana relacionado con programación Web y WebScraping!
                                   </div>
                                   {
                                        dataNews.map((value, index) =>
                                             <CardNews key={index} data={
                                                  {
                                                       title: value.title,
                                                       subheader: value.subheader,
                                                       description: value.description,
                                                       link: value.link,
                                                  }
                                             } />
                                        )
                                   }

                              </div>
                         </div>
                    </div>

                    <Footer />
               </>
               :
               <Redirect to="/" />
          }
          </>
     );
}

export default NewTemplateComponent;