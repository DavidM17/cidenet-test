const EmployeesCtrl = {};

const Employee = require('../models/Employee');

EmployeesCtrl.getEmployees = async (req, res) => {

    const { page = 1, limit = 10 } = req.query;

    const query = {}

    if (req.query.type === '1') query.primer_apellido = { $regex: req.query.value };
    if (req.query.type === '2') query.segundo_apellido = { $regex: req.query.value };
    if (req.query.type === '3') query.primer_nombre = { $regex: req.query.value };
    if (req.query.type === '4') query.otros_nombres = { $regex: req.query.value };
    if (req.query.type === '5') query.numero_identificacion = { $regex: req.query.value };
    if (req.query.type === '6') query.correo = { $regex: req.query.value };
    if ((req.query.typeid !== 'Todos') && (req.query.typeid !== undefined)) query.tipo_identificacion = req.query.typeid;
    if ((req.query.country !== 'Todos') && (req.query.country !== undefined)) query.pais_empleo = req.query.country;
    if ((req.query.state !== 'Todos') && (req.query.state !== undefined)) query.estado = req.query.state;


    try {

        const dataEmployees = await Employee.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Employee.countDocuments();

        res.json({
            dataEmployees,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });

    } catch (err) {
        console.log(err);
    }


}

EmployeesCtrl.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.json(employee);
    } catch (err) {
        console.log(err)
    }

}

EmployeesCtrl.createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save()
        res.json({
            message: 'Created',
        });
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Error',
        });
    }

}

EmployeesCtrl.editEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            message: 'Edited',
        });
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Error',
        });
    }

}

EmployeesCtrl.removeEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Deleted',
        });
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Error',
        });
    }

}

EmployeesCtrl.getEmail = async (req, res) => {

    try {
        const emailEmployees = await Employee.countDocuments({
            primer_nombre: req.query.primer_nombre,
            primer_apellido: req.query.primer_apellido,
            pais_empleo: req.query.pais_empleo
        })

        res.json({
            emailsmatch: emailEmployees,
        });
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Error',
        });
    }


}

module.exports = EmployeesCtrl;
