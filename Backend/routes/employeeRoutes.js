// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/addEmployee', employeeController.addEmployee);
router.post('/updateEmployees', employeeController.updateEmployees);
router.get('/getEmployees', employeeController.getEmployees);

module.exports = router;
