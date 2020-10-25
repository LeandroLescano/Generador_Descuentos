import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/Test" component={HomePage} /> */}
        <Route exact path="/resultados" component={ResultPage} />
        <Route
          render={function () {
            return (
              <div className="jumbotron m-5">
                <h2 className="display-4">Oops!</h2>
                <p className="lead">La página especificada no existe.</p>
                <hr className="my-4" />
                <p>Para volver a la pantalla principal haz click aquí debajo</p>
                <a className="btn btn-primary btn-md" href="/" role="button">
                  Generador de descuentos
                </a>
              </div>
            );
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
