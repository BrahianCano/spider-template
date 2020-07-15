import React from 'react'
import { Redirect } from 'react-router-dom';

// Utilidades //
import { useUser } from 'reactfire';

// Componentes //
import NavBar from '../../components/NavBar';
import FormNewTemplate from '../../components/FormNewTemplate';

const NewTemplateComponent = () => {
     const user = useUser();

     return (
          <>{user ?
               <>
                    <NavBar />
                    <div className="container my-1 text-center">
                         <div class="alert alert-success" role="alert">
                              Llena lo campos requeridos y muéstrales a todos tu increíble código.
                         </div>
                    </div>
                    <section className="container my-1 text-center">
                         <h4 className="mt-5">INFORMACIÓN SOBRE TU CÓDIGO</h4>
                         <FormNewTemplate />
                    </section>
               </>
               :
               <Redirect to="/" />
          }
          </>
     );
}

export default NewTemplateComponent;