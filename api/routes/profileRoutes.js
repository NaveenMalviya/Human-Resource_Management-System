const express = require('express');
const profileController = require('../controller/profileController');
const router = express.Router();

// Routes for profiles
router.post('/create', profileController.createProfile);
router.get('/list', profileController.getAllProfiles);
router.get('/getProfileById', profileController.getProfileById);
router.put('/:id', profileController.updateProfile);
router.delete('/delete', profileController.deleteProfile);
router.delete('/multiDelete', profileController.multiDeleteProfiles);
router.get('/search', profileController.searchProfiles);

module.exports = router;
