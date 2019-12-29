import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBTableHead,
  MDBModalHeader,
  MDBModalFooter,
  MDBTable,
  TableBody,
  MDBIcon
} from "mdbreact";

class ModalAgentes extends React.Component {
  state = {
    modal10: false
  };

  componentWillReceiveProps(e) {
    // console.log("WillReceive " + this.props.show);
  }

  componentDidUpdate() {
    // if (this.props.show === true) {
    //   this.setState({ modal10: this.props.show });
    // }
  }

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  render() {
    return (
      <MDBModal isOpen={this.state.modal10} toggle={this.toggle(10)} size="lg">
        <MDBModalHeader toggle={this.toggle(10)}>
          {this.props.title}
        </MDBModalHeader>
        <MDBModalBody>
          <MDBTable striped>
            <MDBTableHead>
              <tr>
                <th className="text-center">Legajo</th>
                <th>Apellido y Nombre</th>
                <th className="text-center">Días de descuento</th>
              </tr>
            </MDBTableHead>
            <TableBody>
              {this.props.agentes.map((item, i) => {
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
        </MDBModalBody>
        <MDBModalFooter className="justify-content-end">
          <MDBBtn color="primary" outline onClick={this.toggle(10)}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}

export default ModalAgentes;
