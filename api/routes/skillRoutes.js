const express = require('express');
const skillController = require('../controller/skillController');
const router = express.Router();

// Routes for skills
router.post('/create', skillController.createSkill);
router.get('/list', skillController.getAllSkills);
router.get('/getSkillById', skillController.getSkillById);
router.put('/update', skillController.updateSkill);
router.delete('/delete', skillController.deleteSkill);
router.delete('/multiDelete', skillController.multiDeleteSkills);
router.get('/', skillController.searchSkills);

module.exports = router;
