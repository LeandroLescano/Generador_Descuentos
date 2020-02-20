import React from "react";
import { useState } from "react";
import { MDBIcon } from "mdbreact";
import { Toast } from "react-bootstrap";

function AlertToast(props) {
  const [show, setShow] = useState(props.show);

  return (
    <React.Fragment>
      <Toast show={show} onClose={() => setShow(false)} className="toast-place">
        <Toast.Header>
          <MDBIcon icon="exclamation-triangle" className="img-toast" />
          <strong className="mr-auto">Omisiones de fichada</strong>
        </Toast.Header>
        <Toast.Body>
          Los descuentos por omisiones de fichada fueron sumados en el archivo
          de ausencias.
        </Toast.Body>
      </Toast>
    </React.Fragment>
  );
}

export default AlertToast;
