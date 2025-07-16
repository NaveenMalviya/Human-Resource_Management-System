const helpCenterController = require("../controller/helpCenterController");
const express = require("express");
const router = express.Router();

router.route('/createTicket').post(helpCenterController.createTicket);
router.route('/listTickets').get(helpCenterController.getTickets);
router.route('/update').put(helpCenterController.updateTicket);
router.route('/deleteTicket').delete(helpCenterController.deleteTicket);
router.route('/getTicketById').get(helpCenterController.getTicketById);
router.route('/multiDelete').delete(helpCenterController.multiDelete);
router.route('/search').get(helpCenterController.searchHelpCenter);

module.exports = router;

