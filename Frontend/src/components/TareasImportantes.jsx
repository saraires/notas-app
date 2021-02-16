import { useState, useEffect } from "react";
import axios from "../axios/axios"
import { Form, Row, Table } from "react-bootstrap";
import { getFromLocal } from "../functions/localstorage";

function TareasImportantes({ notas }) {
    const [importante, setImportante] = useState([]);
    const [vencer, setVencer] = useState([]);
    const id = getFromLocal("id");

    const transformer = (data) => {
        const fecha = data.split("T");
        return fecha[0];
    }

    useEffect(() => {
        axios.get(`/notasImportantes/${id}`)
            .then((res) => {
                setImportante(res.data)
                console.log(res.data);
            });
    }, []);

    useEffect(() => {
        axios.get(`/notasVencer/${id}`)
            .then((res) => {
                setVencer(res.data)
                console.log(res.data);
            });
    }, []);


    return (
        <>
            <p
                data-dismiss="modal"
                data-backdrop="false"
                type="button"
                className="mt-2 ml-1"
                data-toggle="modal"
                data-target={`#edit`}
            >
                Importante
            </p>
            <div className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} id={`edit`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">¡Importante!</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <Form>

                                {/* Nombre */}
                                <h5 column sm="5">
                                    Tareas con mayor prioridad
                                </h5>
                                <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                    className="d-flex justify-content-center"
                                >
                                    <Table
                                        striped
                                        hover
                                        className="table-responsive mb-4"
                                        style={{ width: "100%", display: "block", margin: "auto" }}
                                    >
                                        <thead className="text-dark text-center table-bordered">
                                            <tr className="table-warning">
                                                <th scope="col">Tarea</th>
                                                <th scope="col">Prioridad</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center table-bordered">
                                            {
                                                importante.map((item, index) => {
                                                    console.log(item._id)
                                                    return (
                                                        <tr key={`${index - item._id}`}>
                                                            <td width="10%">{item.nombre}</td>
                                                            <td width="10%">{item.prioridad}</td>
                                                        </tr>)
                                                })
                                            }
                                        </tbody>
                                    </Table>

                                </Form.Group>

                                {/* Vencimiento */}
                                <h5 column sm="5">
                                    Tareas cercanas a vencer
                                </h5>
                                <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                    className="d-flex justify-content-center"
                                >
                                    <Table
                                        striped
                                        hover
                                        className="table-responsive mb-4"
                                        style={{ width: "100%", display: "block", margin: "auto" }}
                                    >
                                        <thead className="text-dark text-center table-bordered">
                                            <tr className="table-danger">
                                                <th scope="col">Tarea</th>
                                                <th scope="col">Fecha de vencimiento</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center table-bordered">
                                            {
                                                vencer.map((item, index) => {
                                                    console.log(item._id)
                                                    return (
                                                        <tr key={`${index - item._id}`}>
                                                            <td width="10%">{item.nombre}</td>
                                                            <td width="10%">{transformer(item.fecha_vencimiento)}</td>
                                                        </tr>)
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Form.Group>
                            </Form>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Cerrar
                  </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TareasImportantes;


