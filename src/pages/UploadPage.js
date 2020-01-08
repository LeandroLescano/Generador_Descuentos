import React from "react";
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody
} from "mdbreact";
import "./HomePage.css";
import firebase from "firebase";
import Papa from "papaparse";

class UploadPage extends React.Component {
  state = {
    typeFile: "",
    nameNovedades: "",
    nameAusencias: "",
    oficinaPrueba: [],
    fileNovedades: null,
    fileAusencias: null,
    uploadValue: 0,
    descuentos: [
      {
        nombre: "",
        numero: null,
        agentesAus: [],
        agentesNov: []
      }
    ],
    agente: []
  };

  scrollToTop = () => window.scrollTo(0, 0);
  handleClick = e => {
    this.setState({
      typeFile: e.target.value
    });
    if (e.target.value === "Novedades") {
      let input = document.getElementById("fileNovedades");
      input.click();
    } else {
      let input = document.getElementById("fileAusencias");
      input.click();
    }
  };

  handleChange = e => {
    let nameFile = e.target.value.substr(12);
    if (this.state.typeFile === "Novedades") {
      this.setState({
        nameNovedades: nameFile,
        fileNovedades: e.target.files[0]
      });
    } else {
      this.setState({
        nameAusencias: nameFile,
        fileAusencias: e.target.files[0]
      });
    }
  };

  leerArchivo = (file, tipo) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    var descuentos = JSON.parse(JSON.stringify(this.state.descuentos));
    console.log(descuentos);
    //22 - AUSENTE SIN AVISO O SIN JUSTIF
    //28 - FRANCO COMPENSATORIO SIN JUSTIFiCAR
    //42 - LICENCIA EXAMEN SIN JUSTIFICAR
    //45 - LICENCIA ANUAL SIN JUSTIFICAR
    //46 - LIC.ESTUDIO UNIVERS S/JUSTIFICAR
    //51 - EXCESO AUSENCIAS FAMILIAR ENF.
    var codigosDesc = [22, 28, 42, 45, 46, 51];
    Papa.parse(
      file,
      {
        complete: function(results) {
          var rows = results.data;
          var dias = 0;
          var i = 0;
          var keyAct = 0;
          var oficinaAct = rows[0][13];
          descuentos[0] = {
            nombre: oficinaAct.substring(oficinaAct.indexOf("- ") + 8),
            numero: oficinaAct.substring(7, 10),
            agentesAus: [],
            agentesNov: []
          };
          console.log(descuentos);
          console.log("Nombre en inicio: " + descuentos[0].nombre);
          var legajoAct = rows[i][11];
          while (i < rows.length - 1) {
            var nuevo = null;
            var ausenciasAct = [];
            dias = 0;
            keyAct = keyAct + 1;
            legajoAct = rows[i][11];

            while (legajoAct === rows[i][11]) {
              let Novedad = rows[i][20];
              let codigoNov = Novedad.substring(0, Novedad.indexOf(" -"));
              if (codigosDesc.includes(parseInt(codigoNov))) {
                ausenciasAct.push({
                  Nombre: Novedad.substring(Novedad.indexOf("- ") + 2),
                  dias: parseInt(rows[i][18], 10)
                });
                dias += parseInt(rows[i][18], 10);
                nuevo = JSON.parse(
                  JSON.stringify({
                    key: keyAct,
                    legajo: legajoAct.substring(3, legajoAct.indexOf(" -")),
                    nombre: rows[i][12],
                    diasdesc: dias,
                    ausencias: ausenciasAct
                  })
                );
              }
              if (i + 1 < rows.length) {
                i++;
              } else {
                i++;
                break;
              }
            }
            // agentes.push(nuevo);
            if (nuevo !== null) {
              descuentos[0].agentesAus.push(nuevo);
            }
          }
        }
      },
      this.setState(
        {
          descuentos: descuentos
        },
        () => {
          this.props.onUpload(this.state.descuentos);
        }
      )
    );
  };

  subirArchivo = file => {
    const storageRef = firebase.storage().ref(`/Archivos/${file.name}`);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      snapshot => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          uploadValue: percentage
        });
      },
      error => {
        console.log(error.message);
      },
      () => {
        this.setState({
          uploadValue: 100
        });
      }
    );
  };

  generarDescuentos = () => {
    if (this.state.fileAusencias !== null) {
      this.leerArchivo(this.state.fileAusencias, "A");
    }
  };

  render() {
    return (
      <>
        {/* <ModalAgentes
          title="Novedades"
          agentes={this.state.agente}
          show={this.state.mostrarModal}
        /> */}
        <MDBEdgeHeader color="indigo darken-3" className="sectionPage" />
        <div className="mt-3 mb-5">
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                md="10"
                className="mx-auto float-none white z-depth-1 py-2 px-2"
              >
                <MDBCardBody className="text-center">
                  <h2 className="h2-responsive mb-4">
                    <strong className="font-weight-bold">
                      Subir archivos (.csv)
                    </strong>
                  </h2>
                  <MDBRow />
                  <MDBRow className="d-flex flex-row justify-content-center row">
                    <button
                      className="btn Ripple-parent btn-elegant"
                      onClick={this.handleClick}
                      value="Novedades"
                    >
                      Novedades
                    </button>
                    <input
                      id="fileNovedades"
                      type="file"
                      hidden
                      onChange={this.handleChange}
                    ></input>
                    <button
                      className="btn Ripple-parent btn-elegant"
                      onClick={this.handleClick}
                      value="Ausencias"
                    >
                      Ausencias
                    </button>
                    <input
                      id="fileAusencias"
                      type="file"
                      hidden
                      onChange={this.handleChange}
                    ></input>
                  </MDBRow>
                  <MDBRow className="d-flex flex-row justify-content-center row">
                    <p className="textFile">{this.state.nameNovedades}</p>
                    <p className="textFile">{this.state.nameAusencias}</p>
                  </MDBRow>
                  <button
                    className="btn Ripple-parent btn-success top20"
                    onClick={this.generarDescuentos}
                  >
                    Generar
                  </button>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <MDBContainer></MDBContainer>
        </div>
      </>
    );
  }
}

export default UploadPage;
