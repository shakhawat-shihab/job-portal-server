const express = require("express");
const adminController = require("../../controllers/admin.controller");
const authorization = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

const router = express.Router();

router.get('/candidate', verifyToken, authorization('admin'), adminController.getCandidate);
router.get('/candidate/:id', verifyToken, authorization('admin'), adminController.getCandidateDetailsById);
router.get('/hiring-manager/', verifyToken, authorization('admin'), adminController.getHiringManager);
router.patch('/make-admin/:id', verifyToken, authorization('admin'), adminController.updateUserRole);



module.exports = router;