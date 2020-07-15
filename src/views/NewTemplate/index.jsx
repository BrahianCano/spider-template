import React from 'react'
import { Redirect } from 'react-router-dom';

// Utilidades //
import { useUser } from 'reactfire';

// Componentes //
import NavBar from '../../components/NavBar';

const NewTemplateComponent = () => {
     const user = useUser();

     return (
          <>{user ?
               <>
                    <NavBar />
                    <div>
                         <h1>NEW TEMPLATE</h1>
                    </div>
               </>
               :
               <Redirect to="/" />
          }
          </>
     );
}

export default NewTemplateComponent;