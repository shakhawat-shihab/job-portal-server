const express = require("express");
const hiringManagerController = require("../../controllers/hiringManager.controller");
const authorization = require("../../middleware/authorization");

const verifyToken = require("../../middleware/verifyToken");
const router = express.Router();


router.post('/jobs', authorization("hiring-manager"), hiringManagerController.createJob);
router.get('/manager/jobs', authorization("hiring-manager"), hiringManagerController.getJobByCurrentUser);
router.get('/manager/jobs/:id', authorization("hiring-manager"), hiringManagerController.getJobById);
router.patch('/jobs/:id', authorization("hiring-manager"), hiringManagerController.updateJobById);



module.exports = router;