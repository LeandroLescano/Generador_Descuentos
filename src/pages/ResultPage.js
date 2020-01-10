import React from "react";
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBTable,
  TableBody,
  MDBTableHead
} from "mdbreact";
import "./ResultPage.css";
import ReactExport from "react-export-excel";
import XLSX from "xlsx";
import Loading from "../components/loading";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ResultPage extends React.Component {
  state = {
    descuentos: [
      {
        nombre: "",
        numero: null,
        agentesAus: [],
        agentesNov: []
      }
    ],
    loaded: false
  };

  componentDidMount = () => {
    setTimeout(
      function() {
        this.setState({
          descuentos: this.props.desc,
          loaded: true
        });
      }.bind(this),
      2000
    );
  };

  descargarExcel = () => {
    var wb = XLSX.utils.book_new();
    XLSX.write(wb, this.props.descuentos);
    //XLSX.writeFile(this.props.agentes, "ausencias - 153");
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
        <MDBEdgeHeader color="indigo darken-3" className="ResultHeader" />
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
                    <h2 className="h2-responsive mb-4">
                      <strong className="font-weight-bold">Resultados</strong>
                    </h2>
                    <MDBRow />
                    {/* Listado de ausencias */}
                    <h3 className="h3-responsive text-left mb-2">
                      <strong className="font-weight-bold"> Ausencias</strong>
                    </h3>
                    <MDBTable responsiveSm>
                      <MDBTableHead
                        columns={data.columns}
                        color="indigo"
                        textWhite
                      />
                      <TableBody>
                        {this.state.descuentos[0].agentesAus.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-center">{item.legajo}</td>
                              <td>{item.nombre}</td>
                              <td className="text-center">{item.diasdesc}</td>
                            </tr>
                          );
                        })}
                      </TableBody>
                    </MDBTable>
                    {/* Boton para descargar el excel de las ausencias */}
                    <ExcelFile
                      filename={
                        "Descuento ausencias - " +
                        this.state.descuentos[0].numero
                      }
                      element={
                        <button className="btn Ripple-parent btn-indigo top20">
                          Descargar descuentos ausencias (.xlsx)
                        </button>
                      }
                    >
                      <ExcelSheet
                        data={this.state.descuentos[0].agentesAus}
                        name="Employees"
                      >
                        <ExcelColumn value="legajo" />
                        <ExcelColumn value="default" />
                        <ExcelColumn value="diasdesc" />
                      </ExcelSheet>
                    </ExcelFile>
                    {/* Listado de novedades */}
                    <h3 className="h3-responsive text-left mb-2">
                      <strong className="font-weight-bold"> Novedades</strong>
                    </h3>
                    <MDBTable responsiveSm>
                      <MDBTableHead
                        columns={data.columnsN}
                        color="indigo"
                        textWhite
                      />
                      <TableBody>
                        {this.state.descuentos[0].agentesNov.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-center">{item.legajo}</td>
                              <td>{item.nombre}</td>
                              <td className="text-center">{item.horasdesc}</td>
                              <td className="text-center">{item.diasdesc}</td>
                            </tr>
                          );
                        })}
                      </TableBody>
                    </MDBTable>
                    {/* Boton para descargar el excel de las novedades */}
                    <ExcelFile
                      filename={
                        "Descuento horas novedades - " +
                        this.state.descuentos[0].numero
                      }
                      element={
                        <button className="btn Ripple-parent btn-indigo top20">
                          Descargar descuentos horas novedades (.xlsx)
                        </button>
                      }
                    >
                      <ExcelSheet
                        data={this.state.descuentos[0].agentesNov}
                        name="Employees"
                      >
                        <ExcelColumn value="legajo" />
                        <ExcelColumn value="default" />
                        <ExcelColumn value="horasdesc" />
                      </ExcelSheet>
                    </ExcelFile>
                    <ExcelFile
                      filename={
                        "Descuento dias novedades - " +
                        this.state.descuentos[0].numero
                      }
                      element={
                        <button className="btn Ripple-parent btn-indigo top20">
                          Descargar descuentos días novedades (.xlsx)
                        </button>
                      }
                    >
                      <ExcelSheet
                        data={this.state.descuentos[0].agentesNov}
                        name="Employees"
                      >
                        <ExcelColumn value="legajo" />
                        <ExcelColumn value="default" />
                        <ExcelColumn value="diasdesc" />
                      </ExcelSheet>
                    </ExcelFile>
                  </MDBCardBody>
                )}
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <MDBContainer></MDBContainer>
        </div>
      </>
    );
  }
}

export default ResultPage;
