const { getCandidateService, getCandidateWithAppliedJobService, getCandidateDetailsByIdService, updateUserRoleService, getHiringManagerService } = require("../services/admin.service");

exports.getCandidate = async (req, res, next) => {
    try {
        const users = await getCandidateService()
        res.status(200).json({
            status: "success",
            messgae: "Data loaded successfully!",
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data failed to load ",
            error: error.message,
        });
    }
}
exports.getHiringManager = async (req, res, next) => {
    try {
        const users = await getHiringManagerService()
        res.status(200).json({
            status: "success",
            messgae: "Data loaded successfully!",
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data failed to load ",
            error: error.message,
        });
    }
}

exports.getCandidateDetailsById = async (req, res, next) => {
    try {
        const { id } = req.params
        const users = await getCandidateDetailsByIdService(id)
        res.status(200).json({
            status: "success",
            messgae: "Data loaded successfully!",
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data failed to load ",
            error: error.message,
        });
    }
}


exports.updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await updateUserRoleService(id)
        if (result?.modifiedCount) {
            return res.status(200).json({
                status: "success",
                messgae: "Role updated successfully!",
            });
        }
        res.status(400).json({
            status: "fail",
            messgae: "Role updated not possible!",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to update role! ",
            error: error.message,
        });
    }
}