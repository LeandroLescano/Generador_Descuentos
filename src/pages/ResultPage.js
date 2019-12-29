import React, { useCallback } from "react";
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBCard,
  MDBTable,
  MDBTableBody,
  TableBody,
  MDBTableHead
} from "mdbreact";
import "./ResultPage.css";

class ResultPage extends React.Component {
  state = {
    agentes: []
  };

  componentDidMount() {
    console.log(this.props.agentes);
    this.setState({
      agentes: this.props.agentes
    });
  }

  componentWillReceiveProps() {
    console.log("agentes:" + this.props.agentes);
    this.setState({
      agentes: this.props.agentes
    });
  }

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
                <MDBCardBody className="text-center">
                  <h2 className="h2-responsive mb-4">
                    <strong className="font-weight-bold">Resultados</strong>
                  </h2>
                  <MDBRow />

                  <MDBTable responsiveSm>
                    <MDBTableHead
                      columns={data.columns}
                      color="indigo"
                      textWhite
                    />
                    <TableBody>
                      {this.state.agentes.map((item, i) => {
                        if (item.diasdesc > 0) {
                          return (
                            <tr key={i}>
                              <td className="text-center">{item.legajo}</td>
                              <td>{item.nombre}</td>
                              <td className="text-center">{item.diasdesc}</td>
                            </tr>
                          );
                        }
                      })}
                    </TableBody>
                  </MDBTable>

                  <button className="btn Ripple-parent btn-indigo top20">
                    Descargar descuentos (.xlsx)
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

export default ResultPage;
