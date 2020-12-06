import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './EditComponent.css';
import validate from '../pages/RegisterPage/Validation';
import { useFormik } from "formik";
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import DropMenuValues from '../pages/RegisterPage/DropMenuValues';
import { useParams } from 'react-router-dom';


function EditComponent() {

    let URI = 'http://localhost:3000/api';

    const [showerror, setShowerror] = useState(false)
    const [country, setCountry] = useState('');
    const [idType, setIdType] = useState('')
    const [area, setArea] = useState('')
    const [fechaIngreso, setFechaIngreso] = useState()
    const [fecha, setFecha] = useState('')
    const [fechaEdicion, setFechaEdicion] = useState('')
    const [fechaRegistro, setFechaRegistro] = useState('')
    const [email, setEmail] = useState('')
    const [estado, setEstado] = useState('')
    const { id } = useParams()
    const [ingreso, setIngreso] = useState('');
    const [dateoverlay, setDateoverlay] = useState({});
    const [userdata, setUserdata] = useState({});


    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
    } = useFormik({
        initialValues: {
            numero_identificacion: "",
            otros_nombres: "",
            primer_apellido: "",
            primer_nombre: "",
            segundo_apellido: "",
        },
        validate
    });

    useEffect(() => {

        getEmployee()
        var date = new Date()
        var day = date.getDate().toString()
        var month = (date.getMonth() + 1).toString()
        var year = date.getFullYear().toString()
        var hours = date.getHours().toString()
        var minutes = date.getMinutes().toString()
        var seconds = date.getSeconds().toString()

        setFecha(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`)

    }, [])


    const getEmployee = () => {

        axios.get(`${URI}/employee/${id}`).then(
            res => {
                setUserdata(res.data)
                setCountry(res.data.pais_empleo)
                setIdType(res.data.tipo_identificacion)
                setArea(res.data.area)
                setEmail(res.data.correo)
                setFechaRegistro(res.data.fecha_registro)
                setEstado(res.data.estado)
                setIngreso(res.data.fecha_ingreso)
                setFechaEdicion(res.data.fecha_edicion)
                values.numero_identificacion = res.data.numero_identificacion;
                values.otros_nombres = res.data.otros_nombres;
                values.primer_apellido = res.data.primer_apellido;
                values.primer_nombre = res.data.primer_nombre;
                values.segundo_apellido = res.data.segundo_apellido;

                var oneMonthsAgo = new Date(res.data.fecha_ingreso);

                oneMonthsAgo.setMonth(oneMonthsAgo.getMonth() - 1);


                let dateoverlayValue = {
                    disabledDays: {
                        before: oneMonthsAgo,
                        after: new Date(res.data.fecha_ingreso)
                    }
                }
                setDateoverlay(dateoverlayValue)
            }
        ).catch(
            err => console.log(err)
        )
    }





    const handleClick = (e) => {
        e.preventDefault()
        setShowerror(true)

        const isEmpty = !Object.values(values).some(x => (x !== null && x !== ""))

        const isErrorEmpty = Object.keys(errors).length === 0 && errors.constructor === Object
        if (isEmpty === false && isErrorEmpty) {
            values.pais_empleo = country;
            values.tipo_identificacion = idType;
            values.area = area;
            values.fecha_ingreso = fechaIngreso;
            values.estado = estado;
            values.primer_apellido = values.primer_apellido.toLowerCase();
            values.segundo_apellido = values.segundo_apellido.toLowerCase();
            values.primer_nombre = values.primer_nombre.toLowerCase();
            values.otros_nombres = values.otros_nombres.toLowerCase();
            values.numero_identificacion = values.numero_identificacion.toLowerCase();
            values.correo = email;
            values.fecha_edicion = fecha;

            axios.put(`${URI}/employee/${userdata._id}`, values).then(
                res => {
                    console.log(res)
                    alert('Cambios Guardados')
                }

            ).catch(
                err => {
                    console.log(err)
                    alert('No se ha podido guardar los cambios')
                }
            )
            setShowerror(false)

        }


    }

    const handleDayClick = (date) => {
        let day = date.getDate().toString()
        let month = (date.getMonth() + 1).toString()
        let year = date.getFullYear().toString()
        setFechaIngreso(`${year}-${month}-${day}`);
    }



    useEffect(() => {


        if (!errors.primer_nombre && !errors.primer_apellido &&
            (email !== '') && ((values.primer_apellido !== userdata.primer_apellido) ||
                (values.primer_nombre !== userdata.primer_nombre) || (country !== userdata.pais_empleo))) {

            let query = {
                primer_apellido: values.primer_apellido.toLowerCase(),
                primer_nombre: values.primer_nombre.toLowerCase(),
                pais_empleo: country
            }

            axios.get(`http://localhost:3000/api/emailmatch`, { params: query }).then(
                res => {
                    let dir = country === 'Colombia' ? 'co' : 'us'
                    let newemail = `${values.primer_nombre.toLowerCase()}.${values.primer_apellido.toLowerCase()}.${res.data.emailsmatch + 1}@cidenet.com.${dir}`
                    setEmail(newemail)
                }
            ).catch(
                err => console.log(err)
            )
        }



    }, [values.primer_apellido, values.primer_nombre, country, errors.primer_nombre, errors.primer_apellido])

    return (
        <>

            <div className="register-container">
                <div className="register-title">
                    <h1>Edición de Empleado</h1>
                    <p style={{ color: 'red' }}>*Campos Requeridos</p>
                </div>

                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="field-container">
                        <div className="input-container">
                            <label htmlFor="primer_apellido">Primer Apellido* :</label>
                            <input
                                className="capital-letter"
                                maxLength={20}
                                type="text"
                                name="primer_apellido"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.primer_apellido}
                            />
                        </div>
                        {touched.primer_apellido && errors.primer_apellido
                            ? <div className="errors">{errors.primer_apellido}</div>
                            : null}
                    </div>


                    <div className="field-container">
                        <div className="input-container">
                            <label htmlFor="segundo_apellido">Segundo Apellido* :</label>
                            <input
                                className="capital-letter"
                                maxLength={20}
                                type="text"
                                name="segundo_apellido"
                                value={values.segundo_apellido}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />


                        </div>
                        {touched.segundo_apellido && errors.segundo_apellido
                            ? <div className="errors">{errors.segundo_apellido}</div>
                            : null}
                    </div>

                    <div className="field-container">
                        <div className="input-container">
                            <label htmlFor="primer_nombre">Primer Nombre* :</label>
                            <input
                                className="capital-letter"
                                maxLength={20}
                                type="text"
                                name="primer_nombre"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.primer_nombre}
                            />


                        </div>
                        {touched.primer_nombre && errors.primer_nombre
                            ? <div className="errors">{errors.primer_nombre}</div>
                            : null}
                    </div>

                    <div className="field-container">
                        <div className="input-container">
                            <label htmlFor="otros_nombres">Otros Nombres:</label>
                            <input
                                className="capital-letter"
                                maxLength={50}
                                type="text"
                                name="otros_nombres"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.otros_nombres}
                            />
                        </div>
                        {touched.otros_nombres && errors.otros_nombres
                            ? <div className="errors">{errors.otros_nombres}</div>
                            : null}
                    </div>


                    <div className="input-container">
                        <label htmlFor="pais_empleo">País de Empleo:</label>
                        <Dropdown
                            fluid
                            selection
                            onChange={(e) => setCountry(e.target.innerText)}
                            value={country}
                            options={DropMenuValues.countryOptions}
                        />
                    </div>


                    <div className="input-container">
                        <label htmlFor="tipo_ID">Tipo de Identificación:</label>
                        <Dropdown
                            fluid
                            selection
                            onChange={(e) => setIdType(e.target.innerText)}
                            value={idType}
                            options={DropMenuValues.IDOptions}
                        />
                    </div>

                    <div className="field-container">
                        <div className="input-container">
                            <label htmlFor="numero_identificacion">N° Identificación* :</label>
                            <input
                                maxLength={20}
                                type="text"
                                name="numero_identificacion"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.numero_identificacion}
                            />


                        </div>
                        {touched.numero_identificacion && errors.numero_identificacion
                            ? <div className="errors">{errors.numero_identificacion}</div>
                            : null}
                    </div>


                    <div className="input-container">
                        <label htmlFor="correo">Correo:</label>
                        <p>{email}</p>
                    </div>

                    <div className="input-container">
                        <label htmlFor="fecha_ingreso">Fecha de Ingreso:</label>

                        <DayPickerInput
                            placeholder={ingreso}
                            onDayChange={handleDayClick}
                            dayPickerProps={dateoverlay}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="area">Área:</label>
                        <Dropdown
                            fluid
                            selection
                            onChange={(e) => setArea(e.target.innerText)}
                            value={area}
                            options={DropMenuValues.AreaOptions}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="fecha_registro">Fecha de Registro:</label>
                        <p>{fechaRegistro}</p>
                    </div>
                    <div className="input-container">
                        <label htmlFor="fecha_registro">Fecha Última Edición:</label>
                        <p>{fechaEdicion}</p>
                    </div>
                    <div className="input-container">
                        <label htmlFor="estado">Estado:</label>
                        <Dropdown
                            fluid
                            selection
                            onChange={(e) => setEstado(e.target.innerText)}
                            value={estado}
                            options={DropMenuValues.StateOptions}
                        />
                    </div>

                </form>
                {showerror
                    ? <div className="errors">Complete los campos requeridos(*) o inválidos</div>
                    : null}
                <div className="send-container">
                    <button className="button-container" onClick={handleClick} type="submit">Guardar</button>

                </div>
            </div>
        </>

    );
}

export default EditComponent;