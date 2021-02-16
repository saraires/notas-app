import React, { useState } from "react";
import axios from "../axios/axios"
import { Form, Row, Col } from "react-bootstrap";
import { getFromLocal } from "../functions/localstorage";

function EditarTarea({ notas }) {

    const transformer = (data) => {
        const fecha = data.split("T");
        return fecha[0];
    } // Mostrar solo un formato de (YYYY/MM/DD)

    const [nombre, setNombre] = useState(notas.nombre);
    const [prioridad, setPrioridad] = useState(notas.prioridad);
    const [fecha_vencimiento, setFecha_vencimiento] = useState(transformer(notas.fecha_vencimiento));
    const id_nota = notas._id
    const id = getFromLocal("id")

    const udpateTarea = async (e) => {
        e.preventDefault();
        axios
            .put(`/editarNota/`, {
                _id: id_nota,
                nombre: nombre,
                prioridad: prioridad,
                fecha_vencimiento: fecha_vencimiento,
                autor: id
            })
            .then((res) => {
                console.log(res);
                window.location = `/inicio/${id}`;
            });

    };

    return (
        <>
            <button type="button" className="btn btn-success" data-toggle="modal" data-target={`#id${notas._id}`}>
                Editar
            </button>
            <div className="modal" id={`id${notas._id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Editar Nota</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={() => {
                                    setNombre(notas.nombre);
                                    setPrioridad(notas.prioridad);
                                    setFecha_vencimiento(transformer(notas.fecha_vencimiento));
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <Form>
                                {/* Tarea */}
                                <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                    className="d-flex justify-content-center">
                                    <Form.Label column sm="4">
                                        Tarea
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control
                                            type="text"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            placeholder="Ingresa la tarea" />
                                    </Col>
                                </Form.Group>

                                {/* Prioridad */}
                                <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                    className="d-flex justify-content-center">
                                    <Form.Label column sm="4">
                                        ¿Cual es la prioridad de la tarea?
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control
                                            as="select"
                                            value={prioridad}
                                            placeholder="Prioridad"
                                            onChange={(e) => {
                                                setPrioridad(e.target.value);
                                            }}>
                                            <option defaultValue={'0'} selected>
                                                Seleccione...
                                            </option>
                                            <option value="Alta">Alta</option>
                                            <option value="Media">Media</option>
                                            <option value="Baja">Baja</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                {/* Fecha de Vencimiento */}
                                <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                    className="d-flex justify-content-center">
                                    <Form.Label column sm="4">
                                        ¿Cuando vence esta tarea?
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control
                                            type="date"
                                            placeholder="Descripción Grupo"
                                            value={fecha_vencimiento}
                                            onChange={(e) => setFecha_vencimiento(e.target.value)} />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>

                        {/* Modal footer (Boton de editar y cancelar) */}
                        <div className="modal-footer">
                            {/* Editar */}
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss="modal"
                                onClick={(e) => {
                                    udpateTarea(e);
                                    console.log("Tarea actualizado");
                                }}>
                                Editar Notas
                            </button>

                            {/* Cerrar */}
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => {
                                    setNombre(notas.nombre);
                                    setPrioridad(notas.prioridad);
                                    setFecha_vencimiento(transformer(notas.fecha_vencimiento));
                                }}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarTarea;