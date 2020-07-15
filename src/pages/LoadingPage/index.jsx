import React from 'react';

// Estilos //
import './index.css';

const LoadingComponent = () => {
     return (
          <div className="loading-page">
               <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="sr-only">Loading...</span>
               </div>
          </div>

     );
}

export default LoadingComponent;