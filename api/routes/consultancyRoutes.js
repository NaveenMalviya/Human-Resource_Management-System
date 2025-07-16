const express = require('express');
const consultancyController = require('../controller/consultancyController');
const router = express.Router();

// Define routes for consultancy CRUD operations
router.post('/create', consultancyController.createConsultancy);
router.get('/list', consultancyController.getConsultancy);
router.get('/getById', consultancyController.getConsultancyById);
router.put('/update', consultancyController.updateConsultancy);
router.delete('/deleteConsultancy', consultancyController.deleteConsultancy);
router.delete('/multi_delete', consultancyController.multiDelete);
router.get('/search', consultancyController.searchConsultancy);

module.exports = router;
