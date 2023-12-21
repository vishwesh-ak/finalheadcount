// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/addEmployees', employeeController.addEmployees);
router.post('/updateEmployees', employeeController.updateEmployees);
router.get('/getEmployees', employeeController.getEmployees);
router.post('/deleteEmployees', employeeController.deleteEmployees);

module.exports = router;
