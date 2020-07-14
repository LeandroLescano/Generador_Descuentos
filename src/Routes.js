import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/Test" component={HomePage} />
        <Route exact path="/resultados" component={ResultPage} />
        <Route
          render={function() {
            return(
              <div className="row mt-5" style={{justifyContent: "center"}}>
              <div className="col-6 ml-5">
                  <div className="jumbotron">
                  <h2 className="display-4">Oops!</h2>
                  <p className="lead">No pude encontrar la página especificada. Lo siento!</p>
                  <hr className="my-4" />
                  <p>Para volver a la pantalla principal haz click aquí debajo</p>
                  <a className="btn btn-primary btn-md" href="/" role="button">Generador de descuentos</a>
                  </div>
              </div>
                 <div className="col-5">
                <img className="img-fluid border rounded mb-0" width="500px" alt="DogGuardian" src="https://i.pinimg.com/originals/32/da/5c/32da5c3314fcc5ebf1a7b7d1548fcb03.jpg"></img>
              </div>
            </div>
              )
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
