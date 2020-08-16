import React from 'react'
import { Link } from 'react-router-dom';

// Utilidades //
import UseLoginGoogle from '../../hooks/UseLoginGoogle';
import { useUser } from 'reactfire';
import './index.css';

// Componentes //
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Search from '../../components/SearchComponent';



const SearchComponent = () => {
     const [googleAuth] = UseLoginGoogle();
     const user = useUser();

     return (
          <>
               <NavBar />
               <div className="container page-search">
                    <h1 className="mb-5">Spider Template</h1>
                    <Search widthInput='100%' widthForm='60%' heightInput='3rem' />
                    <div className="container page-search__actions">
                         <div className="row py-5">
                              <div className="col-md-6 text-center">
                                   <Link className="btn btn-secondary" to="/dashboard"><i className="fas fa-sliders-h" /> Busqueda avanzada</Link>
                              </div>
                              <div className="col-md-6 text-center">
                                   {user ?
                                        <Link className="btn btn-secondary" to="/dashboard/profile"><i className="fas fa-code" /> Ver mis plantillas</Link>
                                        :
                                        <button className="btn btn-secondary mt-1" onClick={() => { googleAuth() }}><i className="far fa-file-code" /> Compartir una plantilla</button>
                                   }
                              </div>
                         </div>
                    </div>

               </div>

               <Footer />
          </>
     );


}

export default SearchComponent;