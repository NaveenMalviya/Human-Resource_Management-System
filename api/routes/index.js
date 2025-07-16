// const express = require('express');
// const userRoute = require("./userRoutes")
// const candidateRoutes = require('../routes/candidateRoutes');
// const router = express.Router();

// router.use("/user",userRoute)
// router.use("/candidate", candidateRoutes);

// module.exports = router

const express = require('express');
const userRoutes = require('../routes/userRoutes');
const candidateRoutes = require('../routes/candidateRoutes');
const employeeRoutes = require('../routes/employeeRoutes');
const helpCenterRoutes = require('../routes/helpCenterRoutes');
const expensesRoutes = require('../routes/expensesRoutes');
const consultancyRoutes = require('../routes/consultancyRoutes');
const skillRoutes = require('../routes/skillRoutes');
const profileRoutes = require('../routes/profileRoutes'); // Add Profile routes

const router = express.Router();

// Register all the routes
router.use("/user", userRoutes);
router.use("/candidate", candidateRoutes);
router.use("/employee", employeeRoutes);
router.use("/helpcenter", helpCenterRoutes);
router.use("/expenses", expensesRoutes);
router.use("/consultancy", consultancyRoutes);
router.use("/skills", skillRoutes);
router.use("/profiles", profileRoutes); // Register Profile routes


module.exports = router;
