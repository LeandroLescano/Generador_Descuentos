import React from "react";
import "./HomePage.css";
import UploadPage from "./UploadPage";
import ResultPage from "./ResultPage";
import { Redirect } from "react-router-dom";

class HomePage extends React.Component {
  state = {
    typeFile: "",
    nameNovedades: "",
    nameAusencias: "",
    fileNovedades: null,
    fileAusencias: null,
    descuentos: [
      {
        nombre: "",
        numero: null,
        agentesAus: [],
        agentesNov: []
      }
    ],
    agente: [],
    mostrarModal: false,
    resultados: false
  };

  handleChange = e => {
    this.setState({ descuentos: e }, () => {
      this.mostrarResultados();
    });
  };

  mostrarResultados = () => {
    this.setState({
      resultados: true
    });
  };

  scrollToTop = () => window.scrollTo(0, 0);
  render() {
    return (
      <>
        {!this.state.resultados && (
          <UploadPage
            agentes={this.state.agente}
            onUpload={this.handleChange}
          />
        )}
        {/* {this.state.resultados && (
          <Redirect
            to={{
              pathname: "/resultados",
              state: { agentes: this.state.agente }
            }}
          />
        )} */}
        {this.state.resultados && <ResultPage desc={this.state.descuentos} />}
      </>
    );
  }
}

export default HomePage;
