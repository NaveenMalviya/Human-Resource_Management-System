const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
router.post('/signup', employeeController.signup);
router.get('/list', employeeController.getEmployees);
router.put('/update', employeeController.updateEmployee);
router.get('/getById', employeeController.getEmployeeById);
router.delete('/delete', employeeController.deleteEmployee);
router.delete('/multiDelete', employeeController.multiDeleteEmployees);
// router.get('/search', employeeController.searchEmployees);
router.route("/search").get(employeeController.search);
router.get('/count', employeeController.countEmployee);

// Get Upcoming Employee Birthdays
router.get('/upcomingEmployeeBirthday', employeeController.getUpcomingDob);
router.route("/export-data").post(employeeController.export);
router.route("/send-mail").post(employeeController.sendEmail);
module.exports = router;
