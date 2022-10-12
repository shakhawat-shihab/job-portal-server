const { getJobByIdService, applyForJobService, getTopPaidJobService, getTopAppliedJobService, getJobService } = require("../services/candidate.service");
// const cloudinary = require('cloudinary').v2;

exports.getJob = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        //sort , page , limit -> exclude
        const excludeFields = ['sort', 'page', 'limit']
        excludeFields.forEach(field => delete filters[field])
        //gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        filters = JSON.parse(filtersString)
        const queries = {}
        if (req.query.sort) {
            // price,qunatity   -> 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ')
            console.log('sortBy ', sortBy)
            queries.sortBy = sortBy
        }

        if (req.query.fields) {
            let fields = req.query.fields.split(',').join(' ');
            console.log('fields = ', fields);
            queries.fields = fields
        }



        if (req.query.page) {
            const { page = 1, limit = 5 } = req.query;      // "3" "5"
            //50 products
            // each page 10 product
            //page 1--> 1-10
            //page 2--> 2-20
            //page 3--> 21-30     --> page 3  -> skip 1-20  -> 3-1 ->2 *10
            //page 4--> 31-40      ---> page 4 --> 1-30  --> 4-1  -->3*10
            //page 5--> 41-50
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }
        else {
            queries.limit = 10;
        }

        const jobs = await getJobService(filters, queries);
        res.status(200).json({
            status: "success",
            message: "Successfully loaded the jobs",
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


exports.getTopPaidJob = async (req, res, next) => {
    try {
        const { limit = 10 } = req.query;
        const jobs = await getTopPaidJobService(limit);
        res.status(200).json({
            status: "success",
            message: "Successfully loaded the job",
            data: jobs
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to load the job",
            error: error.message,
        });
    }
}
exports.getTopAppliedJob = async (req, res, next) => {
    try {
        const { limit = 10 } = req.query;
        const jobs = await getTopAppliedJobService(limit);
        res.status(200).json({
            status: "success",
            message: "Successfully loaded the job",
            data: jobs
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to load the job",
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
            message: "Failed to load the job",
            error: error.message,
        });
    }
}


exports.applyForJob = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        const candidate = req.user;
        const resumeLink = req?.file?.path;
        if (!resumeLink) {
            return res.status(400).json({
                status: "fail",
                message: "Please attach your resume in pdf format",
            });
        }

        const result = await applyForJobService(jobId, candidate, resumeLink);

        if (result?.modifiedCount) {
            return res.status(200).json({
                status: "success",
                message: "Successfully applied to the job",
                data: result
            });
        }
        if (result?.deadLineFinished) {
            return res.status(400).json({
                status: "fail",
                message: "dead line expired",
            });
        }
        res.status(400).json({
            status: "fail",
            message: "Already Applied",
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to apply to the job",
            error: error.message,
        });
    }
}


exports.uploadFile = async (req, res, next) => {
    try {
        // const uploadFile = await cloudinary.v2.uploader.upload(req.file.path,
        //     {
        //         folder: 'resumeForJob',
        //         resource_type: "auto"
        //     },
        //     (error, result) => {
        //         console.log(result, error);
        //     });
        res.status(200).json({
            file: req.file
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't upload",
            error: error.message,
        });
    }
}