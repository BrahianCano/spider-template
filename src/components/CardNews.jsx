import React from 'react'

const CardNewsComponent = (props) => {

     const { title, subheader, description, link } = props.data;

     return (
          <div  className="card my-2 shadow bg-white rounded" style={{ width: "100%" }}>
               <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{subheader}</h6>
                    <p className="card-text">{description}</p>
                    <a href={link} target="_blanck" className="card-link">Ver en detalle</a>
               </div>
          </div>
     );
}

export default CardNewsComponent;