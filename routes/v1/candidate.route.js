const express = require("express");
const candidateController = require("../../controllers/candidate.controller");
const verifyToken = require("../../middleware/verifyToken");


const router = express.Router();


router.get('/jobs', candidateController.getJob);
router.post('/jobs/:id/apply', verifyToken, candidateController.applyForJob);
router.get('/jobs/:id', candidateController.getJobById);



module.exports = router;