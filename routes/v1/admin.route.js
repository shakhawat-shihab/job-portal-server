const express = require("express");
const adminController = require("../../controllers/admin.controller");
const authorization = require("../../middleware/authorization");

const router = express.Router();

router.get('/candidate', authorization('admin'), adminController.getCandidate);
router.get('/candidate/:id', authorization('admin'), adminController.getCandidateDetailsById);
router.get('/hiring-manager/', authorization('admin'), adminController.getHiringManager);
router.patch('/make-admin/:id', authorization('admin'), adminController.updateUserRole);





module.exports = router;