import React from 'react';
import { Card, Container, Table } from "react-bootstrap";
import axios from "../axios/axios"
import { useState, useEffect } from "react";
import { getFromLocal, saveToLocal } from '../functions/localstorage';
import EditarTarea from './EditarTarea';
import InsertarTarea from './InsertarTarea';


function Notas() {
    const [notas, setNotas] = useState([]);
    saveToLocal("notas", notas);
    const id = getFromLocal("id")
    console.log(notas)

    const transformer = (data) => {
        const fecha = data.split("T");
        return fecha[0];
    }

    useEffect(() => {
        axios.get(`/consultarNotas/${id}`)
            .then((res) => {
                console.log(res.data);
                setNotas(res.data);
            });
    }, []);

    // Boton de eliminar
    const deleteNota = (id_nota) => {
        try {
            axios
                .delete(`/eliminarNota/${id_nota}`);
            console.log(id_nota)
            setNotas(notas.filter(notas => notas._id !== id_nota));
            window.location = `/inicio/${id}`
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <Container className="text-center">
                <h1 className="m-3">Tareas</h1>
                <InsertarTarea />
            </Container>
            <Container>
                <Table
                    striped
                    hover
                    className="table-responsive mb-5"
                    style={{ width: "100%", display: "block", margin: "auto" }}
                >
                    <thead className="text-info text-center table-bordered">
                        <tr className="table-info">
                            <th scope="col">Tarea</th>
                            <th scope="col">Prioridad</th>
                            <th scope="col">Fecha de vencimiento</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="text-center table-bordered">
                        {
                            notas.map((notas, index) => {
                                console.log(notas._id)
                                return (
                                    <tr key={`${index - notas._id}`}>
                                        <td width="10%">{notas.nombre}</td>
                                        <td width="10%">{notas.prioridad}</td>
                                        <td width="10%">{transformer(notas.fecha_vencimiento)}</td>
                                        <td width="10%">
                                            {/* Boton de editar tarea (Abre modal) */}
                                            <EditarTarea notas={notas} />{" "}

                                            {/* Boton eliminar tarea */}
                                            <button type="button" className="btn btn-danger" onClick={() => deleteNota(notas._id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Notas;