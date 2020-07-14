import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Provedor de base de datos //
import firebaseConfig from "./assets/scripts/firebaseConfig";
import { FirebaseAppProvider } from "reactfire";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={'Cargado app...'}>
        <App />
      </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
