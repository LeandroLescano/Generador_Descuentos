import React from "react";
import {
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBTable,
  TableBody,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBInput
  // MDBIcon
} from "mdbreact";
import "./ResultPage.css";
import Loading from "../components/loading";
import { CSVLink } from "react-csv";
// import { Toast } from "react-bootstrap";
// import AlertToast from "../components/alertToast";

class ResultPage extends React.Component {
  state = {
    agentesAusMesAnterior: [
      {
        ausencias:[],
        default: "",
        diasdesc: "",
        diasexenfamil:"",
        diasexenfer: "",
        key: null,
        legajo: "",
        nombre: ""
      }
    ],
    descuentos: [
      {
        nombre: "",
        numero: null,
        agentesAus: [],
        agentesNov: []
      }
    ],
    loaded: false,
    showToast: false,
    modal1: false,
    valuesMesAnterior: []
  };

  handleChangeNew = (i, e) => {
    if(e.target.name === "diasdesc"){
      this.setState({
        valuesMesAnterior: {...this.state.valuesMesAnterior, [i]: {
          diasdesc: e.target.value }}
        });
   }
    else if (e.target.name === "diasexenfer"){
      this.setState({
        valuesMesAnterior: {...this.state.valuesMesAnterior, [i]: {
          diasexenfer: e.target.value }}
        });
    }
    else{
      this.setState({
        valuesMesAnterior: {...this.state.valuesMesAnterior, [i]: {
          diasexenfamil: e.target.value }}
        });
    }
  }

  handleChange = (i, e) => {
    let valuesAct = this.state.valuesMesAnterior;
    if(valuesAct[i] === undefined){
      this.handleChangeNew(i,e);
    }
    else{
      if(e.target.name === "diasdesc"){
        valuesAct[i].diasdesc = e.target.value;
      }
      else if (e.target.name === "diasexenfer"){
        valuesAct[i].diasexenfer = e.target.value;
      }
      else{
        valuesAct[i].diasexenfamil = e.target.value;
      }
      this.setState({
        valuesMesAnterior: valuesAct
      });
    }
  }

  guardarCambios = () => {
    var descuentosMonthPrevious = Object.assign({}, this.state.descuentos);
    for(let key in this.state.valuesMesAnterior){
      let indexAgent = this.state.descuentos[0].agentesAus.findIndex(
        agent => agent.legajo === key
      );
      if(parseInt(this.state.valuesMesAnterior[key].diasdesc) > 0)
        descuentosMonthPrevious[0].agentesAus[indexAgent].diasdesc = parseInt(this.state.valuesMesAnterior[key].diasdesc);
      if(parseInt(this.state.valuesMesAnterior[key].diasexenfer) > 0)
        descuentosMonthPrevious[0].agentesAus[indexAgent].diasexenfer = parseInt(this.state.valuesMesAnterior[key].diasexenfer);
      if(parseInt(this.state.valuesMesAnterior[key].diasexenfamil) > 0)
        descuentosMonthPrevious[0].agentesAus[indexAgent].diasexenfamil = parseInt(this.state.valuesMesAnterior[key].diasexenfamil);
    }
    this.setState({
      descuentos: descuentosMonthPrevious
    }, () => {
      this.toggleModal(1);
    })
  }

  componentDidMount = () => {
    setTimeout(
      function() {
        this.checkOmisionesF();
        this.setState({
          descuentos: this.props.desc,
          loaded: true
        });
      }.bind(this),
      2000
    );
  };

  checkOmisionesF = () => {
    var today = new Date();
    var mesAnterior = today.getMonth();
    if (this.props.desc[0].agentesAus != null) {
      var agentesMesAnterior = this.props.desc[0].agentesAus.filter(agent =>
        agent.ausencias.some(
          aus =>
            parseInt(aus.fechai.substring(4, 5)) < mesAnterior ||
            parseInt(aus.fechai.substring(6, 10) < today.getFullYear())
        )
      );
    }
    this.setState({
      agentesAusMesAnterior: agentesMesAnterior
    });

    if (
      this.props.desc[0].agentesNov.filter(agent => agent.diasdesc > 0).length >
        0 &&
      this.props.desc[0].agentesAus.length > 0
    ) {
      this.toggleToast();
    }
  };

  toggleModal = num => () => {
    let modalNumber = "modal" + num;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  toggleToast = () => {
    this.setState({
      showToast: !this.state.showToast
    });
  };

  offToast = () => {
    this.setState({
      showToast: false
    });
  };

  recargar = () => {
    window.location.reload();
  };

  render() {
    const data = {
      columns: [
        {
          label: "Legajo",
          field: "id"
        },
        {
          label: "Apellido y Nombre",
          field: "heading0"
        },
        {
          label: "Días a descuento",
          field: "heading1"
        },
        {
          label: "Días exceso enfermedad",
          field: "heading2"
        },
        {
          label: "Días exceso familiar enf.",
          field: "heading3"
        }
      ],
      columnsN: [
        {
          label: "Legajo",
          field: "id"
        },
        {
          label: "Apellido y Nombre",
          field: "heading0"
        },
        {
          label: "Horas a descuento",
          field: "heading1"
        },
        {
          label: "Días a descuento",
          field: "heading2"
        }
      ]
    };

    return (
      <>
        <div className="mt-3 mb-5">
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                md="10"
                className="mx-auto float-none white z-depth-1 py-2 px-2"
              >
                {!this.state.loaded && <Loading />}
                {this.state.loaded && (
                  <MDBCardBody className="text-center">
                    <span className="arrowBack" onClick={this.recargar}>
                      <i className="material-icons">arrow_back_ios</i>
                      <p style={{ float: "right" }}>Volver</p>
                    </span>

                    <h2 className="h2-responsive mb-4">
                      <strong className="font-weight-bold">Resultados</strong>
                    </h2>
                    <MDBRow />
                    {/* Listado de ausencias */}
                    {this.state.descuentos[0].agentesAus.length > 0 && (
                      <>
                      <div className="d-flex">
                        <h3 className="h3-responsive text-left mb-2">
                          <strong className="font-weight-bold">
                            {" "}
                            Ausencias {this.state.descuentos[0].numero}
                          </strong>
                        </h3>
                        {this.state.agentesAusMesAnterior.length > 0 && <MDBBtn className="btn-elegant ml-auto" onClick={this.toggleModal(1)}>Ver mes anterior</MDBBtn>}
                      </div>
                        <MDBTable responsiveSm>
                          <MDBTableHead
                            columns={data.columns}
                            color="indigo"
                            textWhite
                          />
                          <TableBody>
                            {this.state.descuentos[0].agentesAus.map(
                              (item, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="text-center">
                                      {item.legajo}
                                    </td>
                                    <td>{item.nombre}</td>
                                    <td className="text-center">
                                      {item.diasdesc}
                                    </td>
                                    <td className="text-center">
                                      {item.diasexenfer}
                                    </td>
                                    <td className="text-center">
                                      {item.diasexenfamil}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </TableBody>
                        </MDBTable>
                        {/* BOTON LISTADO AUSENCIAS */}
                        {this.state.descuentos[0].agentesAus.filter(
                          agent => agent.diasdesc > 0
                        ).length > 0 && (
                          <CSVLink
                            data={this.state.descuentos[0].agentesAus
                              .filter(agent => agent.diasdesc > 0)
                              .slice(1)}
                            headers={[
                              {
                                label: this.state.descuentos[0].agentesAus[0]
                                  .legajo,
                                key: "legajo"
                              },
                              {
                                label: this.state.descuentos[0].agentesAus[0]
                                  .default,
                                key: "default"
                              },
                              {
                                label: this.state.descuentos[0].agentesAus[0]
                                  .diasdesc,
                                key: "diasdesc"
                              }
                            ]}
                            enclosingCharacter={``}
                            filename={
                              "Descuento ausencias " +
                              this.state.descuentos[0].numero +
                              ".csv"
                            }
                            target="_blank"
                          >
                            <button className="btn Ripple-parent btn-indigo top20">
                              Descargar descuentos ausencias (.csv)
                            </button>
                          </CSVLink>
                        )}

                        {/* BOTON LISTADO AUSENCIAS ENFERMEDAD (49) */}

                        {this.state.descuentos[0].agentesAus.filter(
                          agent => agent.diasexenfer > 0
                        ).length > 0 && (
                          <CSVLink
                            data={this.state.descuentos[0].agentesAus
                              .filter(agent => agent.diasexenfer > 0)
                              .slice(1)}
                            headers={[
                              {
                                label: this.state.descuentos[0].agentesAus.filter(
                                  agent => agent.diasexenfer > 0
                                ).legajo,
                                key: "legajo"
                              },
                              {
                                label: this.state.descuentos[0].agentesAus.filter(
                                  agent => agent.diasexenfer > 0
                                ).default,
                                key: "default"
                              },
                              {
                                label: this.state.descuentos[0].agentesAus.filter(
                                  agent => agent.diasexenfer > 0
                                ).diasexenfer,
                                key: "diasexenfer"
                              }
                            ]}
                            enclosingCharacter={``}
                            filename={
                              "Descuento dias exceso enfermedad " +
                              this.state.descuentos[0].numero +
                              ".csv"
                            }
                            target="_blank"
                          >
                            <button className="btn Ripple-parent btn-indigo top20">
                              Descargar descuentos exceso enfermedad (.csv)
                            </button>
                          </CSVLink>
                        )}

                        {/* BOTON LISTADO AUSENCIAS FAMILIAR ENFERMO (51) */}

                        {this.state.descuentos[0].agentesAus.filter(
                          agent => agent.diasexenfamil > 0
                        ).length > 0 && (
                          <CSVLink
                            data={this.state.descuentos[0].agentesAus
                              .filter(agent => agent.diasexenfamil > 0)
                              .slice(1)}
                            headers={[
                              {
                                label: this.state.descuentos[0].agentesAus.filter(
                                  agent => agent.diasexenfamil > 0
                                )[0].legajo,
                                key: "legajo"
                              },
                              {
                                label: this.state.descuentos[0].agentesAus.filter(
                                  agent => agent.diasexenfamil > 0
                                )[0].default,
                                key: "default"
                              },
                              {
                                label: this.state.descuentos[0].agentesAus.filter(
                                  agent => agent.diasexenfamil > 0
                                )[0].diasexenfamil,
                                key: "diasexenfamil"
                              }
                            ]}
                            enclosingCharacter={``}
                            filename={
                              "Descuento dias exceso familiar enf. " +
                              this.state.descuentos[0].numero +
                              ".csv"
                            }
                            target="_blank"
                          >
                            <button className="btn Ripple-parent btn-indigo top20">
                              Descargar descuentos exceso familiar enf. (.csv)
                            </button>
                          </CSVLink>
                        )}
                      </>
                    )}

                    {/* Listado de novedades */}
                    {this.state.descuentos[0].agentesNov.length > 0 && (
                      <>
                        <h3 className="h3-responsive text-left mb-2 mt-3">
                          <strong className="font-weight-bold">
                            {" "}
                            Novedades {this.state.descuentos[0].numero}
                          </strong>
                        </h3>
                        <MDBTable responsiveSm>
                          <MDBTableHead
                            columns={data.columnsN}
                            color="indigo"
                            textWhite
                          />
                          <TableBody>
                            {this.state.descuentos[0].agentesNov.map(
                              (item, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="text-center">
                                      {item.legajo}
                                    </td>
                                    <td>{item.nombre}</td>
                                    <td className="text-center">
                                      {item.horasdesc}
                                    </td>
                                    <td className="text-center">
                                      {item.diasdesc}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </TableBody>
                        </MDBTable>
                        {/* Boton para descargar el excel de las novedades */}
                        {this.state.descuentos[0].agentesNov.filter(
                          agent => agent.horasdesc >= 0.5
                        ).length > 0 && (
                          <CSVLink
                            data={this.state.descuentos[0].agentesNov
                              .filter(agent => agent.horasdesc >= 0.5)
                              .slice(1)}
                            headers={[
                              {
                                label: this.state.descuentos[0].agentesNov.filter(
                                  agent => agent.horasdesc >= 0.5
                                )[0].legajo,
                                key: "legajo"
                              },
                              {
                                label: this.state.descuentos[0].agentesNov.filter(
                                  agent => agent.horasdesc >= 0.5
                                )[0].default,
                                key: "default"
                              },
                              {
                                label: this.state.descuentos[0].agentesNov.filter(
                                  agent => agent.horasdesc >= 0.5
                                )[0].horasdesc,
                                key: "horasdesc"
                              }
                            ]}
                            enclosingCharacter={``}
                            filename={
                              "Descuento horas novedades " +
                              this.state.descuentos[0].numero +
                              ".csv"
                            }
                            target="_blank"
                          >
                            <button className="btn Ripple-parent btn-indigo top20">
                              Descargar descuentos horas novedades (.csv)
                            </button>
                          </CSVLink>
                        )}
                        {this.state.descuentos[0].agentesNov.filter(
                          agent => agent.diasdesc >= 1
                        ).length > 0 &&
                          this.state.descuentos[0].agentesAus.length <= 0 && (
                            <CSVLink
                              data={this.state.descuentos[0].agentesNov
                                .filter(agent => agent.diasdesc >= 1)
                                .slice(1)}
                              headers={[
                                {
                                  label: this.state.descuentos[0].agentesNov.filter(
                                    agent => agent.diasdesc >= 1
                                  )[0].legajo,
                                  key: "legajo"
                                },
                                {
                                  label: this.state.descuentos[0].agentesNov.filter(
                                    agent => agent.diasdesc >= 1
                                  )[0].default,
                                  key: "default"
                                },
                                {
                                  label: this.state.descuentos[0].agentesNov.filter(
                                    agent => agent.diasdesc >= 1
                                  )[0].diasdesc,
                                  key: "diasdesc"
                                }
                              ]}
                              enclosingCharacter={``}
                              filename={
                                "Descuento dias novedades " +
                                this.state.descuentos[0].numero +
                                ".csv"
                              }
                              target="_blank"
                            >
                              <button className="btn Ripple-parent btn-indigo top20">
                                Descargar descuentos días novedades (.csv)
                              </button>
                            </CSVLink>
                          )}
                      </>
                    )}
                  </MDBCardBody>
                )}
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <MDBContainer></MDBContainer>
            <MDBModal size="lg" isOpen={this.state.modal1} toggle={this.toggleModal(1)}>
              <MDBModalHeader toggle={this.toggleModal(1)}>
                ¡Cuidado! Hay agentes que arrastran ausencias del mes pasado
              </MDBModalHeader>
              <MDBModalBody>
                <MDBTable className="text-center" responsiveSm>
                <MDBTableHead
                  columns={data.columns}
                  color="indigo"
                  textWhite
                />
              <MDBTableBody>
                  {this.state.agentesAusMesAnterior.map(
                  (item, i) => {
                    return (
                      <tr key={i}>
                        <td className="text-center">
                          {item.legajo}
                        </td>
                        <td>{item.nombre}</td>
                        <td className="text-center">
                          <MDBInput className="text-center" name="diasdesc" onChange={this.handleChange.bind(this, item.legajo)} valueDefault={item.diasdesc}/>
                        </td>
                        <td className="text-center">
                          <MDBInput className="text-center" name="diasexenfer" onChange={this.handleChange.bind(this, item.legajo)} valueDefault={item.diasexenfer}/>
                        </td>
                        <td className="text-center">
                          <MDBInput className="text-center" name="diasexenfamil" onChange={this.handleChange.bind(this, item.legajo)} valueDefault={item.diasexenfamil}/>
                        </td>
                      </tr>
                    );
                  }
                )}
              </MDBTableBody>
              </MDBTable>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="danger" onClick={this.toggleModal(1)}>
                  Cancelar
                </MDBBtn>
                <MDBBtn color="success" onClick={() =>{this.guardarCambios()}}>
                  Guardar
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          {/* {this.state.showToast && ( */}
          {/* <Toast
            show={this.state.showToast}
            onClose={this.offToast}
            delay={10000}
            autohide
            className="toast-place"
          >
            <Toast.Header>
              <MDBIcon icon="exclamation-triangle" className="img-toast" />
              <strong className="mr-auto">Omisiones de fichada</strong>
            </Toast.Header>
            <Toast.Body>
              Los descuentos por omisiones de fichada fueron sumados en el
              archivo de ausencias.
            </Toast.Body>
          </Toast> */}
          {/* )} */}
        </div>
      </>
    );
  }
}

export default ResultPage;
