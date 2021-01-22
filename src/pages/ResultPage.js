import React, { useState, useEffect } from "react";
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
  MDBInput,
  MDBIcon,
} from "mdbreact";
import "./ResultPage.css";
import "./ResultPage.scss";
import Loading from "../components/loading";
import { Toast } from "react-bootstrap";
import CsvDownloader from "react-csv-downloader";
import Swal from "sweetalert2/src/sweetalert2.js";
import { Redirect } from "react-router-dom";

function ResultPage(props) {
  const initDescuentos = props.desc;

  const [modal, setModal] = useState(false);

  const [state, setState] = useState({
    showToast: false,
    agentesAusMesAnterior: [
      {
        ausencias: [],
        default: 0,
        diasdesc: null,
        diasexenfamil: null,
        diasexenfer: null,
        key: null,
        legajo: "",
        nombre: "",
      },
    ],
    descuentos: initDescuentos,
    loaded: false,
    valuesMesAnterior: [],
  });

  //Function for handle changes after the first change
  const handleChangeNew = (i, e) => {
    if (e.target.name === "diasdesc") {
      setState((state) => ({
        ...state,
        valuesMesAnterior: {
          ...state.valuesMesAnterior,
          [i]: {
            diasdesc: e.target.value,
          },
        },
      }));
    } else if (e.target.name === "diasexenfer") {
      setState((state) => ({
        ...state,
        valuesMesAnterior: {
          ...state.valuesMesAnterior,
          [i]: {
            diasexenfer: e.target.value,
          },
        },
      }));
    } else {
      setState((state) => ({
        ...state,
        valuesMesAnterior: {
          ...state.valuesMesAnterior,
          [i]: {
            diasexenfamil: e.target.value,
          },
        },
      }));
    }
  };

  //Function for handle the changes in the modal of exceeded discounts
  const handleChange = (i, e) => {
    let valuesAct = state.valuesMesAnterior;
    if (valuesAct[i] === undefined) {
      handleChangeNew(i, e);
    } else {
      if (e.target.name === "diasdesc") {
        valuesAct[i].diasdesc = e.target.value;
      } else if (e.target.name === "diasexenfer") {
        valuesAct[i].diasexenfer = e.target.value;
      } else {
        valuesAct[i].diasexenfamil = e.target.value;
      }
      setState((state) => ({
        ...state,
        valuesMesAnterior: valuesAct,
      }));
    }
  };

  //Function for save the changes in the discounts
  const guardarCambios = () => {
    var descuentosMonthPrevious = Object.assign({}, props.desc);
    for (let key in state.valuesMesAnterior) {
      let indexAgent = state.descuentos[0].agentesAus.findIndex(
        (agent) => agent.legajo === key
      );

      if (
        state.valuesMesAnterior[key].diasdesc !==
          descuentosMonthPrevious[0].agentesAus[indexAgent].diasdesc &&
        state.valuesMesAnterior[key].diasdesc !== undefined
      )
        descuentosMonthPrevious[0].agentesAus[indexAgent].diasdesc =
          state.valuesMesAnterior[key].diasdesc;

      if (
        state.valuesMesAnterior[key].diasexenfer !==
          descuentosMonthPrevious[0].agentesAus[indexAgent].diasexenfer &&
        state.valuesMesAnterior[key].diasexenfer !== undefined
      )
        descuentosMonthPrevious[0].agentesAus[indexAgent].diasexenfer =
          state.valuesMesAnterior[key].diasexenfer;

      if (
        state.valuesMesAnterior[key].diasexenfamil !==
          descuentosMonthPrevious[0].agentesAus[indexAgent].diasexenfamil &&
        state.valuesMesAnterior[key].diasexenfamil !== undefined
      )
        descuentosMonthPrevious[0].agentesAus[indexAgent].diasexenfamil =
          state.valuesMesAnterior[key].diasexenfamil;
    }
    setState((state) => ({
      ...state,
      descuentos: descuentosMonthPrevious,
    }));
    toggleModal();
  };

  useEffect(() => {
    console.log(props.desc);
    if (props.desc === undefined) {
      window.location.href = "/";
    }
    setTimeout(function () {
      setState({
        showToast: false,
        agentesAusMesAnterior: [
          {
            ausencias: [],
            default: 0,
            diasdesc: null,
            diasexenfamil: null,
            diasexenfer: null,
            key: null,
            legajo: "",
            nombre: "",
          },
        ],
        descuentos: props.desc,
        loaded: true,
        valuesMesAnterior: [],
      });
      checkOmisionesF();
    }, 2000);
  }, []);

  //Check of missed registration and absences last month
  const checkOmisionesF = () => {
    console.log("checkOmisionesF");
    var today = new Date();
    var mesAnterior = today.getMonth();
    if (mesAnterior === 0) {
      mesAnterior = 12;
    }
    console.log(today);
    console.log("mesAnterior: " + mesAnterior);

    if (state.descuentos[0].agentesAus != null) {
      var agentesMesAnterior = state.descuentos[0].agentesAus
        .filter((agent) => agent.ausencias != null)
        .filter((agent) =>
          agent.ausencias.some(
            (aus) =>
              parseInt(
                aus.fechai.substring(
                  aus.fechai.indexOf("/") + 1,
                  aus.fechai.lastIndexOf("/")
                )
              ) !== mesAnterior ||
              parseInt(
                aus.fechaf.substring(
                  aus.fechaf.indexOf("/") + 1,
                  aus.fechaf.lastIndexOf("/")
                )
              ) !== mesAnterior
          )
        );
    }
    setState((state) => ({
      ...state,
      agentesAusMesAnterior: agentesMesAnterior,
    }));

    if (
      state.descuentos[0].agentesNov.filter((agent) => agent.diasdesc > 0)
        .length > 0 &&
      state.descuentos[0].agentesAus.length > 0
    ) {
      toggleToast();
    }
  };

  //Function for toggle the modals
  const toggleModal = () => {
    setModal(!modal);
  };

  //Function for toggle the toast
  const toggleToast = () => {
    Swal.fire({
      toast: true,
      position: "top",
      icon: "warning",
      title:
        "Las omisiones de fichada fueron automaticamente pasadas al archivo de ausencias",
      timer: 6000,
      timerProgressBar: true,
    });
  };

  //Function for toggle off the toast
  const offToast = () => {
    setState((state) => ({
      ...state,
      showToast: false,
    }));
  };

  const recargar = () => {
    window.location.reload();
  };

  const data = {
    columns: [
      {
        label: "Legajo",
        field: "id",
      },
      {
        label: "Apellido y Nombre",
        field: "heading0",
      },
      {
        label: "Días a descuento",
        field: "heading1",
      },
      {
        label: "Días exceso enfermedad",
        field: "heading2",
      },
      {
        label: "Días exceso familiar enf.",
        field: "heading3",
      },
    ],
    columnsN: [
      {
        label: "Legajo",
        field: "id",
      },
      {
        label: "Apellido y Nombre",
        field: "heading0",
      },
      {
        label: "Horas a descuento",
        field: "heading1",
      },
      {
        label: "Días a descuento",
        field: "heading2",
      },
    ],
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
              {!state.loaded && <Loading />}
              {state.loaded && (
                <MDBCardBody className="text-center">
                  <span className="arrowBack" onClick={() => recargar()}>
                    <i className="material-icons">arrow_back_ios</i>
                    <p style={{ float: "right" }}>Volver</p>
                  </span>

                  <h2 className="h2-responsive mb-4">
                    <strong className="font-weight-bold">Resultados</strong>
                  </h2>
                  <MDBRow />
                  {/* Listado de ausencias */}
                  {state.descuentos[0].agentesAus.length > 0 && (
                    <>
                      <div className="d-flex">
                        <h3 className="h3-responsive text-left mb-2">
                          <strong className="font-weight-bold">
                            Ausencias {state.descuentos[0].numero}
                          </strong>
                        </h3>
                        {state.agentesAusMesAnterior.length > 0 && (
                          <MDBBtn
                            className="btn-elegant ml-auto"
                            onClick={() => toggleModal()}
                          >
                            Ausencias excedentes al mes actual
                          </MDBBtn>
                        )}
                      </div>
                      <MDBTable responsiveSm>
                        <MDBTableHead
                          columns={data.columns}
                          color="indigo"
                          textWhite
                        />
                        <TableBody>
                          {state.descuentos[0].agentesAus.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td className="text-center">{item.legajo}</td>
                                <td>{item.nombre}</td>
                                <td className="text-center">{item.diasdesc}</td>
                                <td className="text-center">
                                  {item.diasexenfer}
                                </td>
                                <td className="text-center">
                                  {item.diasexenfamil}
                                </td>
                              </tr>
                            );
                          })}
                        </TableBody>
                      </MDBTable>
                      {/* BOTON LISTADO AUSENCIAS */}
                      {state.descuentos[0].agentesAus.filter(
                        (agent) => agent.diasdesc > 0
                      ).length > 0 && (
                        <CsvDownloader
                          id="test"
                          bom="false"
                          filename={
                            "Descuento ausencias " +
                            state.descuentos[0].numero +
                            ".csv"
                          }
                          datas={state.descuentos[0].agentesAus.filter(
                            (agent) => agent.diasdesc > 0
                          )}
                          columns={[
                            {
                              id: "legajo",
                              displayName: "",
                            },
                            {
                              id: "default",
                              displayName: "",
                            },
                            {
                              id: "diasdesc",
                              displayName: "",
                            },
                          ]}
                        >
                          <button className="btn Ripple-parent btn-indigo top20">
                            Descargar descuentos ausencias (.csv)
                          </button>
                        </CsvDownloader>
                      )}
                      {/* BOTON LISTADO AUSENCIAS ENFERMEDAD (49) */}
                      {state.descuentos[0].agentesAus.filter(
                        (agent) => agent.diasexenfer > 0
                      ).length > 0 && (
                        <CsvDownloader
                          filename={
                            "Descuento dias exceso enfermedad " +
                            state.descuentos[0].numero +
                            ".csv"
                          }
                          datas={state.descuentos[0].agentesAus.filter(
                            (agent) => agent.diasexenfer > 0
                          )}
                          columns={[
                            {
                              id: "legajo",
                              displayName: "",
                            },
                            {
                              id: "default",
                              displayName: "",
                            },
                            {
                              id: "diasexenfer",
                              displayName: "",
                            },
                          ]}
                        >
                          <button className="btn Ripple-parent btn-indigo top20">
                            Descargar descuentos exceso enfermedad (.csv)
                          </button>
                        </CsvDownloader>
                      )}
                      {/* BOTON LISTADO AUSENCIAS FAMILIAR ENFERMO (51) */}
                      {state.descuentos[0].agentesAus.filter(
                        (agent) => agent.diasexenfamil > 0
                      ).length > 0 && (
                        <CsvDownloader
                          filename={
                            "Descuento dias exceso familiar enf. " +
                            state.descuentos[0].numero +
                            ".csv"
                          }
                          datas={state.descuentos[0].agentesAus.filter(
                            (agent) => agent.diasexenfamil > 0
                          )}
                          columns={[
                            {
                              id: "legajo",
                              displayName: "",
                            },
                            {
                              id: "default",
                              displayName: "",
                            },
                            {
                              id: "diasexenfamil",
                              displayName: "",
                            },
                          ]}
                        >
                          <button className="btn Ripple-parent btn-indigo top20">
                            Descargar descuentos exceso familiar enf. (.csv)
                          </button>
                        </CsvDownloader>
                      )}
                    </>
                  )}

                  {/* Listado de novedades */}
                  {state.descuentos[0].agentesNov.length > 0 && (
                    <>
                      <h3 className="h3-responsive text-left mb-2 mt-3">
                        <strong className="font-weight-bold">
                          {" "}
                          Novedades {state.descuentos[0].numero}
                        </strong>
                      </h3>
                      <MDBTable responsiveSm>
                        <MDBTableHead
                          columns={data.columnsN}
                          color="indigo"
                          textWhite
                        />
                        <TableBody>
                          {state.descuentos[0].agentesNov.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td className="text-center">{item.legajo}</td>
                                <td>{item.nombre}</td>
                                <td className="text-center">
                                  {item.horasdesc}
                                </td>
                                <td className="text-center">{item.diasdesc}</td>
                              </tr>
                            );
                          })}
                        </TableBody>
                      </MDBTable>
                      {/* Boton para descargar el excel de las novedades */}
                      {state.descuentos[0].agentesNov.filter(
                        (agent) => agent.horasdesc >= 0.5
                      ).length > 0 && (
                        <CsvDownloader
                          filename={
                            "Descuento horas novedades " +
                            state.descuentos[0].numero +
                            ".csv"
                          }
                          datas={state.descuentos[0].agentesNov.filter(
                            (agent) => agent.horasdesc >= 0.5
                          )}
                          columns={[
                            {
                              id: "legajo",
                              displayName: "",
                            },
                            {
                              id: "default",
                              displayName: "",
                            },
                            {
                              id: "horasdesc",
                              displayName: "",
                            },
                          ]}
                        >
                          <button className="btn Ripple-parent btn-indigo top20">
                            Descargar descuentos horas novedades (.csv)
                          </button>
                        </CsvDownloader>
                      )}
                      {/*Descargar días por omisión de fichada en caso de que no haya ausencias*/}
                      {state.descuentos[0].agentesNov.filter(
                        (agent) => agent.diasdesc >= 1
                      ).length > 0 &&
                        state.descuentos[0].agentesAus.length <= 0 && (
                          <CsvDownloader
                            filename={
                              "Descuento dias novedades " +
                              state.descuentos[0].numero +
                              ".csv"
                            }
                            datas={state.descuentos[0].agentesNov.filter(
                              (agent) => agent.diasdesc >= 1
                            )}
                            columns={[
                              {
                                id: "legajo",
                                displayName: "",
                              },
                              {
                                id: "default",
                                displayName: "",
                              },
                              {
                                id: "diasdesc",
                                displayName: "",
                              },
                            ]}
                          >
                            <button className="btn Ripple-parent btn-indigo top20">
                              Descargar descuentos días novedades (.csv)
                            </button>
                          </CsvDownloader>
                        )}
                    </>
                  )}
                </MDBCardBody>
              )}
            </MDBCol>
          </MDBRow>
        </MDBFreeBird>
        <MDBContainer></MDBContainer>
        {modal && (
          <MDBModal
            size="lg"
            isOpen={modal}
            toggle={() => {
              toggleModal();
            }}
          >
            <MDBModalHeader
              toggle={() => {
                toggleModal();
              }}
            >
              Agentes que poseen ausencias del mes anterior o siguiente
            </MDBModalHeader>
            <MDBModalBody>
              <MDBTable className="text-center" responsiveSm>
                <MDBTableHead columns={data.columns} color="indigo" textWhite />
                <MDBTableBody>
                  {state.agentesAusMesAnterior.length > 0 &&
                    state.agentesAusMesAnterior.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-center">{item.legajo}</td>
                          <td>{item.nombre}</td>
                          <td className="text-center">
                            <MDBInput
                              className="text-center"
                              name="diasdesc"
                              onChange={handleChange.bind(this, item.legajo)}
                              valueDefault={item.diasdesc}
                            />
                          </td>
                          <td className="text-center">
                            <MDBInput
                              className="text-center"
                              name="diasexenfer"
                              onChange={handleChange.bind(this, item.legajo)}
                              valueDefault={item.diasexenfer}
                            />
                          </td>
                          <td className="text-center">
                            <MDBInput
                              className="text-center"
                              name="diasexenfamil"
                              onChange={handleChange.bind(this, item.legajo)}
                              valueDefault={item.diasexenfamil}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </MDBTableBody>
              </MDBTable>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="danger"
                onClick={() => {
                  toggleModal();
                }}
              >
                Cancelar
              </MDBBtn>
              <MDBBtn
                color="success"
                onClick={() => {
                  guardarCambios();
                }}
              >
                Guardar
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        )}
        {state.showToast && (
          <Toast
            show={state.showToast}
            onClose={offToast}
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
          </Toast>
        )}
      </div>
    </>
  );
}

export default ResultPage;
