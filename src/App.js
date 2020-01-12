import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink
} from "mdbreact";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDmpS8UwB3aHq4qHuzlXVnSj1knOYY8yig",
  authDomain: "generador-descuentos.firebaseapp.com",
  databaseURL: "https://generador-descuentos.firebaseio.com",
  projectId: "generador-descuentos",
  storageBucket: "generador-descuentos.appspot.com",
  messagingSenderId: "91523567902",
  appId: "1:91523567902:web:9cd9a13edc8b30d609f90f",
  measurementId: "G-FBTKKQ9H97"
});

class App extends Component {
  state = {
    collapseID: "",
    typeFile: "",
    nameNovedades: "",
    nameAusencias: "",
    fileNovedades: null,
    fileAusencias: null,
    uploadValue: 0
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () => {
    window.scrollTo(0, 0);
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });
  };

  recargar = () => {
    window.location.reload();
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className="flyout">
          <MDBNavbar color="indigo" dark expand="md" fixed="top" scrolling>
            <MDBNavbarBrand href="/" className="py-0 font-weight-bold">
              {/* <Logo style={{ height: "2.5rem", width: "2.5rem" }} /> */}
              <strong className="align-middle" onClick={this.recargar}>
                Generador de descuentos
              </strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
            <MDBCollapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <MDBNavbarNav right>
                <MDBNavItem>
                  <strong style={{ color: "white" }}>Versión Alpha 1.0</strong>
                </MDBNavItem>
                {/*<MDBNavItem>
                  <MDBNavLink
                    exact
                    to="/"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    <strong>Home</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/css"
                  >
                    <strong>CSS</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/components"
                  >
                    <strong>Components</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/advanced"
                  >
                    <strong>Advanced</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/navigation"
                  >
                    <strong>Navigation</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/forms"
                  >
                    <strong>Forms</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/tables"
                  >
                    <strong>Tables</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/modals"
                  >
                    <strong>Modals</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/addons"
                  >
                    <strong>Addons</strong>
                  </MDBNavLink>
                </MDBNavItem> */}
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: "4rem" }}>
            <Routes />
          </main>
          <MDBFooter color="indigo">
            <div>
              <p className="footer-copyright mb-0 py-3 text-center">
                &copy; {new Date().getFullYear()} Copyright: Lescano, Leandro
                Nicolas{" "}
              </p>
            </div>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;
