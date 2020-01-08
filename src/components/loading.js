import React from "react";
import "./loading.css";
import { MDBCardBody } from "mdbreact";

function Loading() {
  return (
    <React.Fragment>
      <MDBCardBody className="text-center">
        <div className="col-md-12 centrar">
          <svg
            className="spinner"
            width="65px"
            height="65px"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="circle"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              cx="33"
              cy="33"
              r="30"
            ></circle>
          </svg>
          <h3 className="top20">Generando descuentos...</h3>
        </div>
      </MDBCardBody>
    </React.Fragment>
  );
}

export default Loading;
