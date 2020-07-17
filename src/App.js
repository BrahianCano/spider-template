import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Estilos globales de la aplicacion //
import "./App.css";

// Paginas y vistas //
import Main from './views/Main/index';
import NewTemplate from './views/NewTemplate/index';
import Dashboard from './views/Dashboard/index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/newtemplate' component={NewTemplate}/>
        <Route exact path='/dashboard' component={Dashboard}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
