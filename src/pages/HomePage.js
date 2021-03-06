import React from "react";
import { MDBEdgeHeader } from "mdbreact";
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
    descuentos: [
      {
        nombre: "",
        numero: null,
        agentesAus: [],
        agentesNov: [],
      },
    ],
    resultados: false,
    showHome: true,
  };

  handleChange = (e) => {
    console.log(e);
    this.setState({ descuentos: e }, () => {
      this.mostrarResultados();
    });
  };

  mostrarResultados = () => {
    this.setState({
      resultados: true,
      showHome: false,
    });
  };

  scrollToTop = () => window.scrollTo(0, 0);

  render() {
    return (
      <>
        <MDBEdgeHeader color="indigo darken-3" className="sectionPage" />
        {this.state.showHome && (
          <UploadPage
            agentes={this.state.agente}
            onUpload={this.handleChange}
          />
        )}
        {this.state.resultados && <ResultPage desc={this.state.descuentos} />}
      </>
    );
  }
}

export default HomePage;
