import React, { useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom';

// Utilidades //
import MUIDataTable from "mui-datatables";

// Custom Hooks //
import UseGetCollectionFirestore from '../../hooks/UseGetCollectionFirestore';

// Componentes //
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';



const DashboardComponent = () => {
     const history = useHistory();
     const [data, getCollection] = UseGetCollectionFirestore();

     useEffect(() => {
          getCollection('templates');
     }, [])

     const options = {
          filterType: 'checkbox',
          responsive: "standard",
          download: false,
          print: false,
          selectableRowsHeader: false,
          selectableRowsHideCheckboxes: true,
          viewColumns: false,
          onRowClick: function (rowData) {
               const id = rowData[7]
               history.push('dashboard/template=' + id)
          }
     };

     const columns = [
          {
               label: "FECHA EDICIÓN", name: "lastEditeCode", options: {
                    filter: false,
                    sort: true,
               }
          },
          {
               label: "CREADOR", name: "nameUser", options: {
                    filter: true,
                    sort: false,
               }
          },
          {
               label: "TITULO", name: "titleCode", options: {
                    filter: false,
                    sort: false,
               }
          },
          {
               label: "DESCRIPCION", name: "descriptionCode", options: {
                    filter: false,
                    sort: false,
               }
          },
          {
               label: "CATEGORIA", name: "categoryCode", options: {
                    filter: true,
                    sort: false,
               }
          },
          {
               label: "ATS", name: "atsCode", options: {
                    filter: true,
                    sort: false,
               }
          },
          {
               label: "UTILIZADO", name: "contCopy", options: {
                    filter: false,
                    sort: true,
               }
          },
          {
               label: "ID TEMPLATE", name: "idTemplate", options: {
                    display: 'false',
                    filter: false,
                    sort: false,
               }
          },
          {
               label: "FECHA CREACION", name: "createDate", options: {
                    display: 'false',
                    filter: false,
                    sort: false,
               }
          },
          {
               label: "CODIGO FUENTE", name: "scriptCode", options: {
                    display: 'false',
                    filter: false,
                    sort: false,
               }
          }


     ];

     return (
          <>
               <NavBar />
               <div className="mx-3 my-5">
                    <div className="my-1">
                         <div className="alert alert-primary" role="alert">
                              ¡Comparte tus plantillas y códigos con las comunidad! ❤
                         </div>
                    </div>
                    <MUIDataTable
                         title={"PLANTILLAS COMPARTIDAS"}
                         data={data}
                         columns={columns}
                         options={options}
                    />
               </div>
               <Footer />
          </>
     );
}

export default withRouter(DashboardComponent);