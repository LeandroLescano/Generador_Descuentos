import React, { useCallback } from "react";
import "./HomePage.css";
import UploadPage from "./UploadPage";
import ResultPage from "./ResultPage";

class HomePage extends React.Component {
  state = {
    typeFile: "",
    nameNovedades: "",
    nameAusencias: "",
    fileNovedades: null,
    fileAusencias: null,
    uploadValue: 0,
    agente: [],
    mostrarModal: false,
    resultados: false
  };

  handleChange = e => {
    this.setState({ agente: e }, () => {
      this.mostrarResultados();
    });
  };

  mostrarResultados() {
    this.setState({
      resultados: true
    });
  }

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
        {this.state.resultados && <ResultPage agentes={this.state.agente} />}
      </>
    );
  }
}

export default HomePage;
