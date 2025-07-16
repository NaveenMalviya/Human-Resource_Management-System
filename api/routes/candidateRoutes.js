const express = require("express");
const router = express.Router();
const candidateController = require("../controller/candidateController");

// Create a new candidate
router.post("/create", candidateController.create);

// Get all candidates
router.get("/list", candidateController.getcandidates);

// Get candidate by ID
router.get("/getById", candidateController.getCandidateById);

// Update candidate by ID
router.put("/update", candidateController.update);

// Delete candidate by ID
router.delete("/delete", candidateController.deleteCandidate);

// Delete multiple candidates
router.delete("/multi-delete", candidateController.multiDeletecandidates);

// Search candidates
// router.post("/search", candidateController.searchCandidates);
router.route('/search').get(candidateController.search)

router.route('/export-data').post(candidateController.export)
router.route('/send-mail').post(candidateController.sendEmail);


router.get('/count', candidateController.countCandidates);


module.exports = router;
