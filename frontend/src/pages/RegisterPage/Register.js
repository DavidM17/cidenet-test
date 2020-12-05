import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './Register.css';
import validate from './Validation';
import { useFormik } from "formik";
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import DropMenuValues from './DropMenuValues';


function Register() {

    const [showerror, setShowerror] = useState(false)
    const [country, setCountry] = useState('Colombia');
    const [idType, setIdType] = useState('Cédula')
    const [area, setArea] = useState('Administración')
    const [lastday, setLastday] = useState();
    const [fechaIngreso, setFechaIngreso] = useState()
    const [fecha, setFecha] = useState('')
    const [fechaReducida, setFechaReducida] = useState('')

    useEffect(() => {
        var date = new Date()
        var day = date.getDate().toString()
        var month = (date.getMonth() + 1).toString()
        var year = date.getFullYear().toString()
        var hours = date.getHours().toString()
        var minutes = date.getMinutes().toString()
        var seconds = date.getSeconds().toString()

        setFecha(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`)
        setFechaReducida(`${year}-${month}-${day}`)
        setFechaIngreso(`${year}-${month}-${day}`)

        var oneMonthsAgo = new Date();
        oneMonthsAgo.setMonth(oneMonthsAgo.getMonth() - 1);
        setLastday(oneMonthsAgo)
    }, [])

    

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values, // use this if you want controlled components
        errors,
    } = useFormik({
        initialValues: {
            primer_apellido: "",
            segundo_apellido: "",
            primer_nombre: "",
            otros_nombres: "",
            numero_identificacio: ""
        },
        validate
    });

    const handleClick = (e) => {
        e.preventDefault()
        setShowerror(true)
        
        const isEmpty = !Object.values(values).some(x => (x !== null && x !== ""))

        const isErrorEmpty = Object.keys(errors).length === 0 && errors.constructor === Object
        if (isEmpty === false && isErrorEmpty) {
            console.log('Registrado')
            values.pais_empleo = country;
            values.tipo_identificacion = idType;
            values.area = area;
            values.fecha_ingreso = fechaIngreso;
            values.fecha_registro = fecha; 
            values.estado = "activo"

            axios.post('http://localhost:3000/api/employee',values).then(
                res => console.log(res)
            ).catch(
                err => console.log(err)
            )
            setShowerror(false)

        }
        console.log(errors)
        
    }

    const handleDayClick = (date) => {
        let day = date.getDate().toString()
        let month = (date.getMonth() +1 ).toString()
        let year = date.getFullYear().toString()
        setFechaIngreso(`${year}-${month}-${day}`);
    }

    const dateoverlay = {
        disabledDays: {

            before: lastday,
            after: new Date()
        }
        
    }

    return (
        <>

            <div className="register-container">
                <div className="register-title">
                    <h1>Registro de Empleados</h1>
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
                            />


                        </div>
                        {touched.numero_identificacio && errors.numero_identificacio
                            ? <div className="errors">{errors.numero_identificacio}</div>
                            : null}
                    </div>


                    <div className="input-container">
                        <label htmlFor="correo">Correo:</label>
                        <input
                            type="text"
                            name="correo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="fecha_ingreso">Fecha de Ingreso:</label>

                        <DayPickerInput
                            placeholder={fechaReducida}
                            
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
                        <p>{fecha}</p>
                    </div>
                    <div className="input-container">
                        <label htmlFor="estado">Estado:</label>
                        <p>Activo</p>
                    </div>

                </form>
                {showerror
                    ? <div className="errors">Complete los campos requeridos(*) o invalidos</div>
                    : null}
                <button onClick={handleClick} type="submit">Registrar</button>
            </div>
        </>

    );
}

export default Register;