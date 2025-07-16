const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();
const authenticationdata = require("../config/middleware");
 
router.route('/signup').post(userController.signup);
router.route('/list').get(userController.getUsers);
router.route('/edit').put(userController.updateUser);
router.route('/getuserbyid').get(userController.getUserById);
router.route('/login').post(userController.login);
router.route('/login_auth').post(userController.login_auth);
router.route('/delete').delete(userController.delete);
router.route('/changepassword').put( userController.changePassword);
router.route('/search').get(userController.searchUsers);



module.exports = router;




