const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require('../models/User');

exports.getJobService = async (filters, queries) => {
    // console.log(queries)
    const jobs = await Job.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const totalJobs = await Job.countDocuments(filters)
    const page = Math.ceil(totalJobs / queries.limit)
    return { totalJobs, page, jobs };
};

exports.getTopPaidJobService = async (limit) => {
    // console.log(queries)
    const jobs = await Job.find({}).select('-application -candidate')
        .limit(limit)
        .sort('-salary')
    return jobs;
};
exports.getTopAppliedJobService = async (limit) => {
    // console.log(queries)
    const jobs = await Job.find()
        .limit(limit)
        .sort('-applyCount')
    return jobs;
};

exports.getJobByIdService = async (id) => {
    // const jobs = await Job.findById(id).populate('hiringManager.id');
    const jobs = await Job.findById(id).populate({ path: 'hiringManager.id', select: '-password' });
    return jobs;
}

exports.applyForJobService = async (jobId, candidate, resumeLink) => {

    const alreadyApplied = await Job.find({ _id: jobId, candidate: { $in: [ObjectId(candidate.id)] } });
    const job = await Job.findOne({ _id: jobId });

    //application
    obj = {
        user: {
            name: candidate.fullname,
            id: candidate.id
        },
        job: {
            id: jobId
        },
        company: {
            name: job.company['name'],
            id: job.company['id']
        },
        resume: resumeLink
    }
    // console.log(obj)

    const date = new Date();
    // console.log('alreadyApplied ', date, job.deadLine)

    if (date.getTime() > job.deadLine.getTime()) {
        // console.log('inside')
        return { deadLineFinished: true }
    }
    else if (alreadyApplied.length === 0) {
        // const app = await Application.create(application);
        const app = await Application.create(obj);
        const result = await Job.updateOne({ _id: jobId }, { $push: { application: app._id, candidate: candidate.id }, $inc: { applyCount: 1 } });
        await User.updateOne({ _id: candidate.id }, { $push: { appliedJob: jobId } });
        return result;
    }
    else {
        return { modifiedCount: 0 }
    }
}