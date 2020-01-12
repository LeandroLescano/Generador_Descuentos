import React from "react";
import {
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
    ]
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

  leerArchivoA = (file, tipo) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    var descuentosAus = JSON.parse(JSON.stringify(this.state.descuentos));
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
          descuentosAus[0] = {
            nombre: oficinaAct.substring(oficinaAct.indexOf("- ") + 8),
            numero: oficinaAct.substring(7, 10),
            agentesAus: [],
            agentesNov: []
          };
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
                  nombre: Novedad.substring(Novedad.indexOf("- ") + 2),
                  fechai: rows[i][16],
                  fechaf: rows[i][17],
                  dias: parseInt(rows[i][18], 10)
                });
                dias += parseInt(rows[i][18], 10);
                nuevo = JSON.parse(
                  JSON.stringify({
                    key: keyAct,
                    default: 0,
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
            if (nuevo !== null) {
              descuentosAus[0].agentesAus.push(nuevo);
            }
          }
        }
      },
      this.setState(
        {
          descuentos: descuentosAus
        },
        () => {
          if (this.state.fileNovedades !== null) {
            this.leerArchivoN(this.state.fileNovedades, "N", descuentosAus);
          } else {
            this.props.onUpload(this.state.descuentos);
          }
        }
      )
    );
  };

  leerArchivoN = (file, tipo, descuentoAnterior) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    var descuentosNov;
    if (descuentoAnterior != null) {
      descuentosNov = Object.assign({}, descuentoAnterior);
    } else {
      descuentosNov = [];
    }
    //1 - LLEGADA TARDE
    //2 - SALIDA ANTICIPADA
    //3 - HORAS NO TRABAJADAS
    //4 - OMITIO FICHAR
    var codigosDesc = [1, 2, 3, 4];
    Papa.parse(
      file,
      {
        complete: function(results) {
          var rows = results.data;
          var dias = -1;
          var i = 0;
          var keyAct = 0;
          var oficinaAct = rows[0][6];

          if (descuentoAnterior != null) {
            descuentosNov[0] = {
              nombre: descuentoAnterior[0].nombre,
              numero: descuentoAnterior[0].numero,
              agentesAus: descuentoAnterior[0].agentesAus,
              agentesNov: []
            };
          } else {
            descuentosNov[0] = {
              nombre: "",
              numero: oficinaAct.substring(
                oficinaAct.indexOf("Oficina") + 8,
                oficinaAct.indexOf("Oficina") + 11
              ),
              agentesAus: [],
              agentesNov: []
            };
          }
          var legajoAct = rows[i][11];
          while (i < rows.length - 1) {
            var nuevo = null;
            var horas = {
              hora: 0,
              min: 0
            };
            var novedadesAct = [];
            dias = -1;
            keyAct = keyAct + 1;
            legajoAct = rows[i][16].substring(3, 8);
            while (legajoAct === rows[i][16].substring(3, 8)) {
              let Novedad = rows[i][20];
              let codigoNov = Novedad.substring(0, Novedad.indexOf(" -"));
              if (codigosDesc.includes(parseInt(codigoNov))) {
                novedadesAct.push({
                  nombre: Novedad.substring(Novedad.indexOf("- ") + 2),
                  valor: rows[i][23], // Tiempo ej: 00:15
                  dias: parseInt(rows[i][18], 10)
                });
                if (codigoNov === "4") {
                  dias++;
                } else {
                  let horasN = parseInt(rows[i][23].substring(0, 2)); //Primeras dos posiciones del String
                  let minutesN = parseInt(rows[i][23].substring(3, 5)); // Ultimas dos posiciones del string
                  horas.hora += horasN;
                  if (horas.min + minutesN > 59) {
                    horas.hora++;
                    horas.min += minutesN - 60;
                  } else {
                    horas.min += minutesN;
                  }
                }
                var horasDesc = horas.hora;
                if (horasDesc <= 0) {
                  if (horas.min > 15 && horas.min < 30) {
                    horasDesc += 0.5;
                  } else if (horas.min >= 30) {
                    horasDesc += 1;
                  }
                } else {
                  if (horas.min > 0 && horas.min < 30) {
                    horasDesc += 0.5;
                  } else if (horas.min >= 30) {
                    horasDesc += 1;
                  }
                }
                horasDesc = horasDesc.toString().replace(",", ".");
                let diasDesc = 0;
                if (dias >= 1) {
                  diasDesc = dias;
                }
                if (diasDesc > 0 || horasDesc > 0) {
                  nuevo = JSON.parse(
                    JSON.stringify({
                      key: keyAct,
                      default: 0,
                      legajo: legajoAct,
                      nombre: rows[i][16].substring(11),
                      diasdesc: diasDesc,
                      horasdesc: horasDesc,
                      novedades: novedadesAct
                    })
                  );
                }
              }
              if (i + 1 < rows.length - 1) {
                i++;
              } else {
                i++;
                break;
              }
            }
            if (nuevo !== null) {
              descuentosNov[0].agentesNov.push(nuevo);
            }
          }
        }
      },
      this.setState(
        {
          descuentos: descuentosNov
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
      this.leerArchivoA(this.state.fileAusencias, "A");
    } else if (this.state.fileNovedades !== null) {
      this.leerArchivoN(this.state.fileNovedades, "N");
    }
  };

  render() {
    return (
      <>
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
