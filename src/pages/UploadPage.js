import React from "react";
import {
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBBtn,
  MDBModalFooter
} from "mdbreact";
import "./HomePage.css";
import firebase from "firebase";
import Papa from "papaparse";

class UploadPage extends React.Component {
  state = {
    typeFile: "",
    nameNovedades: "",
    nameAusencias: "",
    listOficinas: [],
    fileNovedades: null,
    fileAusencias: null,
    checkAus: false,
    checkNov: false,
    uploadValue: 0,
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    descuentos: [
      {
        nombre: "",
        numero: null,
        agentesAus: [],
        agentesNov: []
      }
    ]
  };

  recargar = () => {
    window.location.reload();
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
    if (e.target.files.length > 0) {
      if (this.state.typeFile === "Novedades") {
        this.setState(
          {
            nameNovedades: nameFile,
            fileNovedades: e.target.files[0]
          },
          () => {
            let check = false;
            if (
              this.state.fileNovedades !== null &&
              this.state.fileNovedades.type !== "application/vnd.ms-excel"
            ) {
              this.toggleModal(1)();
              this.setState({
                checkNov: check
              });
            } else {
              this.papaParsePromiseNov(this.state.fileNovedades).then(
                results => {
                  if (!results) {
                    this.toggleModal(3)();
                  } else {
                    check = true;
                  }
                  this.setState({
                    checkNov: check
                  });
                }
              );
            }
          }
        );
      } else {
        this.setState(
          {
            nameAusencias: nameFile,
            fileAusencias: e.target.files[0]
          },
          () => {
            let check = false;
            if (
              this.state.fileAusencias !== null &&
              this.state.fileAusencias.type !== "application/vnd.ms-excel"
            ) {
              this.toggleModal(1)();
              this.setState({
                checkAus: check
              });
            } else {
              this.papaParsePromiseAus(this.state.fileAusencias).then(
                results => {
                  if (!results) {
                    this.toggleModal(2)();
                  } else {
                    check = true;
                  }
                  this.setState({
                    checkAus: check
                  });
                }
              );
            }
          }
        );
      }
    }
  };

  leerArchivoA = (file, tipo) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    var listOficinasTest = []
    var descuentosAus = JSON.parse(JSON.stringify(this.state.descuentos));
    //20 - ENFERMEDAD SIN JUSTIFICAR
    //21 - FAMILIAR ENFERMO SIN JUSTIF
    //22 - AUSENTE SIN AVISO O SIN JUSTIF
    //28 - FRANCO COMPENSATORIO SIN JUSTIFiCAR
    //42 - LICENCIA EXAMEN SIN JUSTIFICAR
    //43
    //45 - LICENCIA ANUAL SIN JUSTIFICAR
    //46 - LIC.ESTUDIO UNIVERS S/JUSTIFICAR
    //47
    //48
    //53 lic matrimonio sin justif
    //55
    //32/100 - Nac Hijo sin justificar
    //60 dona sangre sin justif
    //64
    //117
    //122
    //133
    //150 lic esp sin justif
    //203
    //206 EXCESO DE ENFERMEDAD PROLONGADA
    //245 1 DÍA A CUENTA S/JUSTIF
    // -- CODIGOS DE EXCESOS EXENFAMIL Y EXENFER --
    //49 - EXCESO AUSENCIAS ENFERMEDAD
    //51 - EXCESO AUSENCIAS FAMILIAR ENF.
    var codigosDesc = [
      20,
      21,
      22,
      28,
      32,
      42,
      43,
      45,
      46,
      47,
      48,
      49,
      51,
      53,
      55,
      60,
      64,
      100,
      117,
      122,
      133,
      150,
      203,
      206,
      245
    ];
    Papa.parse(
      file,
      {
        complete: function(results) {
          var rows = results.data;
          var dias = 0,
           diasenfer = 0,
           diasfamil = 0;
          var i = 0;
          var keyAct = 0;
          var x = 0;
          while (rows[0][x] !== "Observaciones" && x < rows[0].length) {
            x++;
          }
          var iObserv = x;
          var oficinaAct = rows[0][iObserv + 3];
          descuentosAus[0] = {
            nombre: oficinaAct.substring(oficinaAct.indexOf("- ") + 8),
            numero: oficinaAct.substring(7, 10),
            agentesAus: [],
            agentesNov: []
          };
          var legajoAct = rows[i][iObserv + 1];
          while (i < rows.length - 1) {
            //GUARDO OFICINA EN ARRAY PARA VER TODAS LAS OFICINAS
            if(!listOficinasTest.includes(rows[i][iObserv + 3].substring(7,10))){
                  listOficinasTest.push(rows[i][iObserv + 3].substring(7,10));
            }

            var nuevo = null;
            var ausenciasAct = [];
            dias = 0;
            diasenfer = 0;
            diasfamil = 0;
            keyAct = keyAct + 1;
            legajoAct = rows[i][iObserv + 1];

            while (legajoAct === rows[i][iObserv + 1]) {
              let Novedad = rows[i][iObserv + 10];
              let codigoNov = Novedad.substring(0, Novedad.indexOf(" -"));
              if (codigosDesc.includes(parseInt(codigoNov))) {
                ausenciasAct.push({
                  codigo: codigoNov,
                  nombre: Novedad.substring(Novedad.indexOf("- ") + 2),
                  fechai: rows[i][iObserv + 6],
                  fechaf: rows[i][iObserv + 7],
                  dias: parseInt(rows[i][iObserv + 8], 10),
                  descripcion: rows[i][iObserv + 11]
                });
                if (codigoNov === "49") {
                  diasenfer += parseInt(rows[i][iObserv + 8], 10);
                } else if (codigoNov === "51") {
                  diasfamil += parseInt(rows[i][iObserv + 8], 10);
                } else {
                  dias += parseInt(rows[i][iObserv + 8], 10);
                }
                nuevo = JSON.parse(
                  JSON.stringify({
                    key: keyAct,
                    default: "0",
                    legajo: legajoAct.substring(3, legajoAct.indexOf(" -")),
                    oficina: rows[i][iObserv + 3].substring(7,10),
                    nombre: rows[i][iObserv + 2].replace("�", "Ñ"),
                    diasdesc: dias.toString(),
                    diasexenfer: diasenfer.toString(),
                    diasexenfamil: diasfamil.toString(),
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
          console.log(listOficinasTest);
        }
      },
      this.setState(
        {
          descuentos: descuentosAus,
          listOficinas: listOficinasTest
        },
        () => {
          if (this.state.checkNov) {
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
          console.log(rows);
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
                  if (horas.min > 15 && horas.min <= 30) {
                    horasDesc += 0.5;
                  } else if (horas.min > 30) {
                    horasDesc += 1;
                  }
                } else {
                  if (horas.min > 0 && horas.min <= 30) {
                    horasDesc += 0.5;
                  } else if (horas.min > 30) {
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
                      default: "0",
                      legajo: legajoAct,
                      nombre: rows[i][16].substring(11).replace("�", "Ñ"),
                      diasdesc: diasDesc.toString(),
                      horasdesc: horasDesc.toString(),
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
              if (descuentosNov[0].agentesAus.length > 0) {
                let indexAgent = descuentosNov[0].agentesAus.findIndex(
                  // eslint-disable-next-line
                  agent => agent.legajo === nuevo.legajo
                );
                if (indexAgent !== -1 && nuevo.diasdesc > 0) {
                  descuentosNov[0].agentesAus[indexAgent].diasdesc =
                    parseInt(descuentosNov[0].agentesAus[indexAgent].diasdesc) +
                    parseInt(nuevo.diasdesc);
                } else if (nuevo.diasdesc > 0) {
                  descuentosNov[0].agentesAus.push(nuevo);
                  descuentosNov[0].agentesAus.sort(function(a, b) {
                    return a.legajo - b.legajo;
                  });
                }
              }
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

  papaParsePromiseAus = function(file) {
    return new Promise(function(complete, error) {
      Papa.parse(file, {
        step: function(results, parser) {
          var rows = results.data;
          for (var x = 0; x < rows.length; x++) {
            if (rows[x] === "Dias Corridos") {
              complete(true);
              parser.abort();
            }
          }
          complete(false);
        }
      });
    });
  };

  papaParsePromiseNov = function(file) {
    return new Promise(function(complete, error) {
      Papa.parse(file, {
        step: function(results, parser) {
          var rows = results.data;
          for (var x = 0; x < rows.length; x++) {
            if (rows[x] === "Valor") {
              complete(true);
            }
          }
          complete(false);
        }
      });
    });
  };

  generarDescuentos = () => {
    if (this.state.checkAus) {
      this.leerArchivoA(this.state.fileAusencias, "A");
    } else if (this.state.checkNov) {
      this.leerArchivoN(this.state.fileNovedades, "N");
    }
  };

  toggleModal = num => () => {
    let modalNumber = "modal" + num;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  render() {
    const checkAus =
      this.state.fileAusencias === null
        ? "btn-elegant"
        : this.state.checkAus
        ? "btn-success"
        : "btn-danger";

    const checkNov =
      this.state.fileNovedades === null
        ? "btn-elegant"
        : this.state.checkNov
        ? "btn-success"
        : "btn-danger";

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
                      Subir archivos misma oficina (.csv)
                    </strong>
                  </h2>

                  <MDBRow />
                  <MDBRow className="d-flex flex-row justify-content-center row">
                    <button
                      className={`btn Ripple-parent ${checkNov}`}
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
                      className={`btn Ripple-parent ${checkAus}`}
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
          <MDBContainer>
            <MDBModal isOpen={this.state.modal1} toggle={this.toggleModal(1)}>
              <MDBModalHeader toggle={this.toggleModal(1)}>
                Ha ocurrido un problema
              </MDBModalHeader>
              <MDBModalBody>
                El archivo elegido no corresponde a un
                <strong> archivo .CSV</strong>, por favor intente nuevamente.
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="indigo" onClick={this.toggleModal(1)}>
                  Entendido
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <MDBModal isOpen={this.state.modal2} toggle={this.toggleModal(2)}>
              <MDBModalHeader toggle={this.toggleModal(2)}>
                Ha ocurrido un problema
              </MDBModalHeader>
              <MDBModalBody>
                El archivo de <strong>ausencias</strong> seleccionado no es
                válido, intente con otro archivo. <br /> <br />
                Recuerde que el mismo debe ser descargado de: <br />
                'Ausencias por legajo completo'.
                <br /> <br />
                En caso de que el error persista, por favor comuníquese con el
                administrador del sistema.
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="indigo" onClick={this.toggleModal(2)}>
                  Entendido
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <MDBModal isOpen={this.state.modal3} toggle={this.toggleModal(3)}>
              <MDBModalHeader toggle={this.toggleModal(3)}>
                Ha ocurrido un problema
              </MDBModalHeader>
              <MDBModalBody>
                El archivo de <strong>novedades</strong> seleccionado no es
                válido, intente nuevamente.
                <br />
                <br />
                En caso de que el error persista, por favor comuníquese con el
                administrador del sistema.
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="indigo" onClick={this.toggleModal(3)}>
                  Entendido
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <MDBModal isOpen={this.state.modal4} toggle={this.toggleModal(4)}>
              <MDBModalHeader toggle={this.toggleModal(4)}>
                Ha ocurrido un problema
              </MDBModalHeader>
              <MDBModalBody>
                Ambos archivos seleccionados no son válidos, intente nuevamente.
                <br />
                <br />
                En caso de que el error persista, por favor comuníquese con el
                administrador del sistema.
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="indigo" onClick={this.toggleModal(4)}>
                  Entendido
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </MDBContainer>
        </div>
      </>
    );
  }
}

export default UploadPage;
