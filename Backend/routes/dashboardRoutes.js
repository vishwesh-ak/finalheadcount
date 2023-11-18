
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');


router.get('/getDOJData', dashboardController.getDOJData);
router.get('/getDOLData', dashboardController.getDOLData);

router.get('/getEmpTypeData', dashboardController.getEmpTypeData);
router.get('/getDiversityData', dashboardController.getDiversityData);
router.get('/getLocationData', dashboardController.getLocationData);

router.get('/getFullData', dashboardController.getFullData);

router.get('/getDeptEmpTypeData', dashboardController.getDeptEmpTypeData);
router.get('/getDeptDiversityData', dashboardController.getDeptDiversityData);
router.get('/getDeptLocationData', dashboardController.getDeptLocationData);
module.exports = router;
