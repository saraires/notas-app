import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './css/styles.css';
import Inicio from './pages/Inicio';
import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SingIn} />
          <Route exact path="/registro" component={SingUp} />
          <Route exact path="/inicio/:id" component={Inicio} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
