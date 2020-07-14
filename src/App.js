import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Estilos globales de la aplicacion //
import "./App.css";

// Paginas y vistas //
import Main from './views/Main/index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
