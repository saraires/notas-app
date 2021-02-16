import React, { useState } from "react";
import axios from "../axios/axios"
import { Form, Row, Col } from "react-bootstrap";
import { saveToLocal, getFromLocal } from "../functions/localstorage";

function InsertarTarea({ }) {
  const [nombre, setNombre] = useState();
  const [prioridad, setPrioridad] = useState();
  const [fecha_vencimiento, setFecha_vencimiento] = useState();
  const id = getFromLocal("id")

  const InsertNota = async (e) => {
    e.preventDefault();
    axios
      .post(`/insertarNota`, {
        nombre: nombre,
        prioridad: prioridad,
        fecha_vencimiento: fecha_vencimiento,
        autor: id
      })
      .then((res) => {
        const id_nota = res.data["_id"];
        console.log(res);
      });
    window.location = `/inicio/${id}`;
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success mb-5"
        data-toggle="modal"
        data-target={`#id`}
      >
        Insertar Tarea
      </button>
      <div className="modal" id={`id`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Insertar Tarea</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setNombre();
                  setPrioridad();
                  setFecha_vencimiento();
                }}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <Form>

                {/* Nombre */}
                <Form.Group
                  as={Row}
                  controlId="formPlaintextPassword"
                  className="d-flex justify-content-center"
                >
                  <Form.Label column sm="5">
                    Agregar Tarea
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      type="text"
                      placeholder="¿Qué tienes que hacer?"
                      onChange={(e) => {
                        setNombre(e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Prioridad */}
                <Form.Group
                  as={Row}
                  controlId="formPlaintextPassword"
                  className="d-flex justify-content-center"
                >
                  <Form.Label column sm="5">
                    ¿Cual es la prioridad de la tarea?
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      as="select"
                      onChange={(e) => {
                        setPrioridad(e.target.value);
                        console.log(e.target.value);
                      }}
                    >
                      <option defaultValue={'0'} selected>
                        Seleccione...
                      </option>
                      <option value="Alta">Alta</option>
                      <option value="Media">Media</option>
                      <option value="Baja">Baja</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                {/* Fecha de vencimiento */}
                <Form.Group
                  as={Row}
                  controlId="formPlaintextPassword"
                  className="d-flex justify-content-center"
                >
                  <Form.Label column sm="5">
                    ¿Cuando vence esta tarea?
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      type="date"
                      placeholder=""
                      onChange={(e) => {
                        setFecha_vencimiento(e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

              </Form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={(e) => {
                  InsertNota(e);
                  console.log("Tarea Agregada");
                }}
              >
                Agregar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setNombre();
                  setPrioridad();
                  setFecha_vencimiento();
                }}
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

export default InsertarTarea;