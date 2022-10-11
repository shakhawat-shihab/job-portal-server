const { createJobService, getJobByCurrentUserService, getJobByIdService, updateJobByIdService } = require("../services/hiringmanager.service");

exports.createJob = async (req, res, next) => {
    try {
        console.log(req.user);
        // var subset = _.pick(req.user, ['id', 'fullName', 'email']);
        const combine = req.body;
        const obj = {};
        obj.id = req.user.id;
        obj.name = req.user.fullname;
        obj.email = req.user.email;
        combine.hiringManager = obj;
        // console.log('combined ', obj)
        const job = await createJobService(combine);

        res.status(200).json({
            status: "success",
            message: "Successfully created the job",
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to create the job",
            error: error.message,
        });
    }
}


exports.getJobByCurrentUser = async (req, res, next) => {
    try {
        const { id } = req.user;
        const jobs = await getJobByCurrentUserService(id);

        res.status(200).json({
            status: "success",
            message: "Successfully loaded the job",
            data: jobs
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to load the jobs",
            error: error.message,
        });
    }
}

exports.getJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const jobs = await getJobByIdService(id);

        res.status(200).json({
            status: "success",
            message: "Successfully loaded the job",
            data: jobs
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to load the jobs",
            error: error.message,
        });
    }
}

exports.updateJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateJobByIdService(id, req.body);
        if (result?.modifiedCount) {
            return res.status(200).json({
                status: "success",
                message: "Successfully updated the job",
                data: result
            });
        }
        res.status(400).json({
            status: "fail",
            message: "Failed to update the job",
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to update the job",
            error: error.message,
        });
    }
}