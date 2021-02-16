import React from 'react';
import Logo from "../Images/Logo.png";
import axios from "../axios/axios"
import { Card, Container, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { saveToLocal, getFromLocal } from "../functions/localstorage";
import swal from "sweetalert2";

const signInSchema = Yup.object().shape({
    email: Yup.string().email("Correo Invalido").required("Ingrese un correo"),
    password: Yup.string()
      .required("Ingrese contraseña")
      .min(6, "La contraseña debe tener mínimo 8 caracteres")
      .matches(/[a-z]/, "Debe tener una letra en minúscula")
      .matches(/[A-Z]/, "Debe tener una letra en mayuscula")
  });

function SingIn() {
    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={signInSchema}
                onSubmit={(values) => {
                    axios
                        .post("/", { 
                            correo: values.email,
                            contraseña: values.password,
                        })
                        .then((res) => {
                            console.log(res);
                            console.log(res.data.correo);
                            if (res.data["correo"] === values.email) {
                                const id = res.data["_id"];
                                saveToLocal("id", id);

                                const nombre = res.data["nombre"];
                                saveToLocal("nombre", nombre);

                                const correo = res.data["correo"];
                                saveToLocal("correo", correo);

                                window.location.href =`/inicio/${id}`;

                                swal.fire({
                                    title: "Bienvenido!",
                                    text: "Se pudo iniciar sesión correctamente",
                                    icon: "success",
                                    confirmButtonText: "Ok",
                                });
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            swal.fire({
                                title: "Error!",
                                text: "Correo y/o contraseña incorrectos",
                                icon: "error",
                                confirmButtonText: "Ok",
                            });
                        });
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Container className="mt-4">
                        <Card
                            className="d-flex m-auto my-auto pb-4 shadow-lg"
                            style={{ width: "25rem" }}
                        >
                            <Card.Img
                                className="pt-5 d-flex m-auto"
                                variant="top"
                                style={{ width: "6rem" }}
                                src={Logo}
                            />
                            <center>
                            <Form className="col-12 col-md-9 m-auto align-items-center">
                            <center>
                            <h2 className="mt-4 col-12">Inicio de sesión</h2>
                            </center>
                                <label className="mt-3">Correo Electrónico:</label>
                                <Field
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="Ingresa tu correo"
                                />
                                {errors.email && touched.email ? (
                                    <div style={{ color: "red" }}>{errors.email}</div>
                                ) : null}
                                <div className="mb-4">
                                <label className="mt-3">Contraseña:</label>
                                <Field
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Ingresa tu contraseña"
                                />
                                {errors.password && touched.password ? (
                                    <div style={{ color: "red" }}>{errors.password}</div>
                                ) : null}
                                </div>

                                <Button className="mb-5 d-flex m-auto" variant="primary" type="onSubmit">
                                    Ingresar
                                </Button>
                                <br/>
                                <center>
                                <label className="mb-3">¿Eres nuevo por aquí?</label>
                                <br/>
                                <Button href="/registro" className="col-7" variant="primary" type="submit">
                                    Registrate
                                </Button>
                                </center>
                            </Form>
                            </center>
                        </Card>
                    </Container>
                )}
            </Formik>
        </>
    )
}
export default SingIn;