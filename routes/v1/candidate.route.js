const express = require("express");
const candidateController = require("../../controllers/candidate.controller");
const uploader = require("../../middleware/uploader");
const verifyToken = require("../../middleware/verifyToken");


const router = express.Router();

// router.post('/file-upload', uploader.single('resume'), candidateController.uploadFile)
router.post('/file-upload', uploader.handleUpload, candidateController.uploadFile)

router.get('/jobs', candidateController.getJob);
router.post('/jobs/:id/apply', verifyToken, uploader.handleUpload, candidateController.applyForJob);
router.get('/jobs/:id', candidateController.getJobById);

//top 10 highest paid job
router.get('/job/top-paid', candidateController.getTopPaidJob);

//top 5 most applied job
router.get('/job/top-applied', candidateController.getTopAppliedJob);

module.exports = router;