import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFromLocal } from "../functions/localstorage";
import TareasImportantes from './TareasImportantes';

// Imagenes
import Logo from "../Images/Logo.png";
import importante from "../Images/importante.png";
import usuario from "../Images/usuario.png";

function Menu() {
    const id = getFromLocal("id");
    const notas = getFromLocal("notas");
    const nombre = getFromLocal("nombre");

    return (
        <div className="mb-5" style={{ position: "fixed", width: "100%" }}>
            <Navbar collapseOnSelect expand="lg" bg="light">
                <Navbar.Brand href="#home">
                    <Link to={`/inicio/${id}`}>
                        <img
                            src={Logo}
                            width="50"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                            style={{ display: "block" }}
                        />
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link
                            as={Link}
                            to={`/inicio/${id}`}
                            eventKey={1}
                        >
                            Notas
                        </Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Link to={`/inicio/${id}`}>
                            <img
                                src={importante}
                                width="40"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                                style={{ display: "block" }}
                            />
                        </Link>
                        <TareasImportantes notas={notas} />{" "}
                        <Link to={`/inicio/${id}`}>
                            <img
                                src={usuario}
                                width="40"
                                className="d-inline-block align-top ml-3"
                                alt="React Bootstrap logo"
                                style={{ display: "block" }}
                            />
                        </Link>
                        <Nav.Link>
                            {nombre}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Menu;