import React from "react";
import { MDBEdgeHeader } from "mdbreact";
import "./HomePage.css";
import UploadPage from "./UploadPage";
import ResultPage from "./ResultPage";
import ResultPageTest from "./ResultPageTestFunction";

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
    resultados: false,
    resultadosTest: false,
    showHome: true
  };

  handleChange = e => {
    console.log(e);
    this.setState({ descuentos: e }, () => {
      this.mostrarResultados();
    });
  };

  mostrarResultados = () => {
    var location = window.location.href.substring(window.location.href.lastIndexOf("/"))
    if(location === "/Test"){
      this.setState({
        resultadosTest: true,
        showHome: false
      })
    } else{
      this.setState({
        resultados: true,
        showHome: false
      });
    }
  };

  scrollToTop = () => window.scrollTo(0, 0);
  render() {
    return (
      <>
        <MDBEdgeHeader color="indigo darken-3" className="sectionPage" />
        {this.state.showHome  && (
          <UploadPage
            agentes={this.state.agente}
            onUpload={this.handleChange}
          />
        )}
        {this.state.resultados && <ResultPage desc={this.state.descuentos} />}
        {this.state.resultadosTest && <ResultPageTest desc={this.state.descuentos} />}
      </>
    );
  }
}

export default HomePage;
