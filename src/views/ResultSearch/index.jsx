import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFirestore } from "reactfire";

// Componentes //
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Search from '../../components/SearchComponent';

// Recursos //
import logo from '../../assets/images/logo64.png';

const ResultSearch = () => {
     const firestore = useFirestore();
     const { keyword } = useParams();
     const [resultSearch, SetResultSearch] = useState(null);
     const [templates, setTemplate] = useState(null);


     useEffect(() => {
          firestore()
               .collection('templates')
               .onSnapshot((querySnapshot) => {
                    const docs = [];
                    querySnapshot.forEach(function (doc) {
                         docs.push(doc.data());
                    });
                    setTemplate(docs);
                    //console.log(docs)
               });
     }, []);

     useEffect(() => {
          if (templates !== null) {
               const result = templates.filter(word => word.descriptionCode.toLowerCase().indexOf(keyword.trim()) != -1);
               SetResultSearch(result);
          }
     }, [templates, keyword]);

    // useEffect(() => {
    //      if (templates !== null) {
    //           console.log(resultSearch)
    //      }
    // }, [resultSearch])


     return (
          <>
               <NavBar />
               <main className="container">
                    <header className="d-flex align-content-center py-3">
                         <img src={logo} alt="logo" className="mx-2" style={{ height: "40px" }} />
                         <Search widthInput='100%' widthForm='60%' heightInput='3rem' />
                    </header>
                    <div className="container">
                         <Link type="button" to="/dashboard" className="btn btn-secondary btn-sm"><i className="fas fa-sliders-h"/> Busqueda avanzada</Link>
                    </div>
                    <hr />
                    <section className="container">
                         {resultSearch !== null &&
                              <p className="text-muted">{resultSearch.length} resultados</p>
                         }
                         {resultSearch !== null &&
                              resultSearch.map(item =>
                                   <article className="mt-4" key={item.idTemplate}>
                                        <header>
                                             <Link to={"/dashboard/template=" + item.idTemplate} style={{ color: '#e34b31' }}>
                                                  <h4>{item.titleCode}</h4>
                                             </Link>
                                             <small className="font-italic" style={{ color: '#196F3D' }}>{"https://spidertemplate.web.app/dashboard/template=" + item.idTemplate}</small>
                                        </header>
                                        <div>
                                             <time className="text-muted"><small>{item.lastEditeCode}</small></time>
                                             <span className="text-justify"> - {item.descriptionCode}</span>
                                        </div>
                                        <div className="d-flex">
                                             <span className="mr-5" style={{ color: '#F1C40F' }}><i className="fas fa-star" /> {item.contCopy}</span>
                                             <small className="border border-dark px-1 rounded-pill"><i className="fas fa-user" /> {item.nameUser}</small>
                                        </div>
                                   </article>
                              )
                         }

                    </section>
               </main>
               <Footer />
          </>
     );
}

export default ResultSearch;