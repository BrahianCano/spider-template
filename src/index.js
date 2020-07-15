import React, { Suspense } from "react";
import ReactDOM from "react-dom";

// Estilos//
import App from "./App";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-ocean.css';
import 'codemirror/mode/javascript/javascript';
//import 'codemirror/mode/xml/xml';
//import 'codemirror/mode/php/php';


// Provedor de base de datos //
import firebaseConfig from "./assets/scripts/firebaseConfig";
import { FirebaseAppProvider } from "reactfire";

// Componentes //
import LoadingPage from "./pages/LoadingPage/index";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<LoadingPage />}>
        <App />
      </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
