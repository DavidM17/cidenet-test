import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './View.css';
import axios from 'axios';
import { Dropdown, Icon, Table } from 'semantic-ui-react'
import DropMenuValues from './DropMenuValues';
import ReactPaginate from 'react-paginate';


function View() {

    const [employees, setEmployees] = useState({});
    const [queryType, setQueryType] = useState('1');
    const [query, setQuery] = useState('');
    const [country, setCountry] = useState('Todos');
    const [idType, setIdType] = useState('Todos');
    const [estado, setEstado] = useState('Todos');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        handleSearch()
    }, [page])

    const handleDelete = (e) => {

        if (window.confirm('¿Está seguro de que desea eliminar el empleado?')) {

            axios.delete(`http://localhost:3000/api/employee/${e}`).then(
                res => {
                    console.log(res)
                    handleSearch()
                }
            ).catch(
                err => console.log(err)
            )

        }
    }

    const handleQueryOption = (event, result) => {
        const { value } = result || event.target
        setQueryType(value)
    }

    const handleSearch = () => {

        let data = {
            page: page,
            limit: 10,
            type: queryType,
            value: query,
            typeid: idType,
            country: country,
            state: estado
        }

        axios.get('http://localhost:3000/api/employees', { params: data }).then(
            res => {
                console.log(res.data)
                setEmployees(res.data.dataEmployees)
                setTotalPages(res.data.totalPages);
            }
        ).catch(
            err => console.log(err)
        )
    }

    const handlePageClick = (e) => {
        console.log(e.selected + 1)
        setPage(e.selected + 1)
        handleSearch()

    };

    return (
        <>
            <div className="table-container">
                <h1>Empleados</h1>
                <div className="filter-container">


                    <div className="input-container">
                        <label htmlFor="area">Tipo de Busqueda:</label>
                        <Dropdown
                            onChange={handleQueryOption}
                            fluid
                            selection
                            value={queryType}
                            options={DropMenuValues.queryOptions}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="busqueda">Buscar:</label>
                        <input
                            onKeyPress={e => e.key === 'Enter' ? handleSearch() : null}
                            onChange={e => setQuery(e.target.value)}
                            type="text"
                            name="query"
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="pais">País de Empleo:</label>
                        <Dropdown
                            onChange={e => setCountry(e.target.innerText)}
                            fluid
                            selection
                            value={country}
                            options={DropMenuValues.countryOptions}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="tipo_id">Tipo de Identificación:</label>
                        <Dropdown
                            onChange={e => setIdType(e.target.innerText)}
                            fluid
                            selection
                            value={idType}
                            options={DropMenuValues.IDOptions}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="estado">Estado:</label>
                        <Dropdown
                            onChange={(e) => setEstado(e.target.innerText)}
                            fluid
                            selection
                            value={estado}
                            options={DropMenuValues.StateOptions}
                        />
                    </div>
                    <button onClick={handleSearch}>Buscar</button>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Empleado</Table.HeaderCell>
                                <Table.HeaderCell>Identificación</Table.HeaderCell>
                                <Table.HeaderCell>Área</Table.HeaderCell>
                                <Table.HeaderCell>Correo</Table.HeaderCell>
                                <Table.HeaderCell>Estado</Table.HeaderCell>
                                <Table.HeaderCell>Acciones</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                (employees.length > 0) ?
                                    (employees.map((employee, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{employee.primer_nombre} {employee.otros_nombres} {employee.primer_apellido} {employee.segundo_apellido}</Table.Cell>
                                            <Table.Cell>{employee.numero_identificacion}</Table.Cell>
                                            <Table.Cell>{employee.area}</Table.Cell>
                                            <Table.Cell>{employee.correo}</Table.Cell>
                                            <Table.Cell>{employee.estado}</Table.Cell>
                                            <Table.Cell>
                                                <Icon color='blue' name='edit' size='large' />
                                                <Icon color='red' name='delete' size='large' onClick={() => handleDelete(employee._id)} />
                                            </Table.Cell>
                                        </Table.Row>
                                    ))) : (
                                        <></>
                                    )
                            }

                        </Table.Body>


                    </Table>
                </div>
                <div className="pag-container">
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>

            </div>

        </>

    );
}

export default View;