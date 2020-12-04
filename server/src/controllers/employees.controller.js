const EmployeesCtrl = {};

const Employee = require('../models/Employee');

EmployeesCtrl.getEmployees = async (req,res) => {

    const { page = 1, limit = 10 } = req.query;

    const query = {}

    if(req.query.type == '1') query.primer_apellido = req.query.value;
    if(req.query.type == '2') query.segundo_apellido = req.query.value;
    if(req.query.type == '3') query.primer_nombre = req.query.value;
    if(req.query.type == '4') query.otros_nombres = req.query.value;
    if(req.query.type == '5') query.numero_identificacion = req.query.value;
    if(req.query.type == '6') query.correo = req.query.value;
    if(req.query.typeid !== 'ALL') query.tipo_identificacion = req.query.typeid;
    if(req.query.country !== 'ALL') query.pais_empleo = req.query.country;
    if(req.query.state !== 'ALL') query.estado = req.query.state;


    try {
        
        const dataEmployees = await Employee.find(query)
            .limit(limit * 1)
            .skip((page -1 ) * limit)
            .exec();
        
            const count = await Employee.countDocuments();

            res.json({
                dataEmployees,
                totalPages: Math.ceil(count/limit),
                currentPage: page
            });

    }catch(err){
        console.log(err);
    }

    
}

EmployeesCtrl.getEmployee = async (req,res) => {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
}

EmployeesCtrl.createEmployee = async (req,res) => {
    const newEmployee = new Employee(req.body);
    await newEmployee.save()
    res.send('Created');
}

EmployeesCtrl.editEmployee = async (req,res) => {
    await Employee.findByIdAndUpdate(req.params.id,req.body);
    res.send('Edited');
}

EmployeesCtrl.removeEmployee = async (req,res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.send('Deleted');
}

module.exports = EmployeesCtrl;