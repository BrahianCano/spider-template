import React from 'react'
import { Redirect } from 'react-router-dom';

// Utilidades //
import { useUser, useFirestore } from 'reactfire';
import 'firebase/firebase-firestore';

import Swal from 'sweetalert2';
import uniqid from 'uniqid';

// Componentes //
import NavBar from '../../components/NavBar';
import FormNewTemplate from '../../components/FormNewTemplate';
import Footer from '../../components/Footer';


const NewTemplateComponent = () => {
     const firestore = useFirestore();
     const user = useUser();
     const id = uniqid();

     const onSubmitNewTemplate = async (dataInputs) => {
          const dataTemplate = {
               ...dataInputs,
               idUser: user.uid,
               idTemplate: id
          }
          try {
               await firestore().collection('templates').doc(dataTemplate.idTemplate).set(dataTemplate);
               Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Plantilla agregada con exito.',
                    showConfirmButton: false,
                    timer: 1200
               })
          } catch (err) {
               console.error(err);
               Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Algo a salido mal, intenta de nuevo',
                    showConfirmButton: false,
                    timer: 1200
               })
          }
     }

     return (
          <>{user ?
               <>
                    <NavBar />
                    <div className="container my-1 text-center">
                         <div className="alert alert-primary" role="alert">
                              Llena lo campos requeridos y muéstrales a todos tu increíble código.
                         </div>
                    </div>
                    <section className="container my-5 text-center">
                         <h4 className="my-1">DATOS SOBRE TU PLANTILLA</h4>
                         <FormNewTemplate onSubmitNewTemplate={onSubmitNewTemplate} />
                    </section>
                    <Footer />
               </>
               :
               <Redirect to="/" />
          }
          </>
     );
}

export default NewTemplateComponent;