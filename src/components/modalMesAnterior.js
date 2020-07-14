import React, { forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import {
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
  MDBIcon
} from "mdbreact";

const ModalMesAnterior = forwardRef( (props, ref) => {
  const [show, setShow] = React.useState(true);

  useImperativeHandle(ref, () => {
    return{
      testMethod: () => console.log("testing modal ref")
    }
  })

  const mostrar = () => {
    setShow(true);
  }

  const ocultar = () => {
    setShow(false);
  }

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

  if(show) {
    return ReactDOM.createPortal(
      <MDBModal size="lg" isOpen={show} toggle={ocultar}>
        <MDBModalHeader toggle={ocultar}>
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
            {this.props.agentes.map(
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
          <MDBBtn color="danger" onClick={ocultar}>
            Cancelar
          </MDBBtn>
          <MDBBtn color="success" onClick={() =>{this.guardarCambios()}}>
            Guardar
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>, document.getElementById("modal-root")
    )
  }
  return null;
  }
)

export default ModalMesAnterior;
