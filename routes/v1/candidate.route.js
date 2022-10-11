const express = require("express");
const candidateController = require("../../controllers/candidate.controller");
const verifyToken = require("../../middleware/verifyToken");


const router = express.Router();


router.get('/jobs', candidateController.getJob);
router.post('/jobs/:id/apply', verifyToken, candidateController.applyForJob);
router.get('/jobs/:id', candidateController.getJobById);

//top 10 highest paid job
router.get('/job/top-paid', candidateController.getTopPaidJob);

//top 5 most applied job
router.get('/job/top-applied', candidateController.getTopAppliedJob);

module.exports = router;