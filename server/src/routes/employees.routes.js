const {Router} = require('express');

const router = Router();

const employeesCtrl = require('../controllers/employees.controller');

router.get('/employees/',employeesCtrl.getEmployees);
router.post('/employee',employeesCtrl.createEmployee);
router.get('/employee/:id',employeesCtrl.getEmployee);
router.put('/employee/:id',employeesCtrl.editEmployee);
router.delete('/employee/:id',employeesCtrl.removeEmployee);


module.exports = router;