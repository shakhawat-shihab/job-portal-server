const Job = require("../models/Job");

exports.createJobService = async (job) => {
    const result = await Job.create(job);
    return result;
}
exports.getJobByCurrentUserService = async (id) => {
    const jobs = await Job.find({ 'hiringManager.id': id }).populate('hiringManager.id');
    const jobCount = await Job.countDocuments({ 'hiringManager.id': id })
    return { jobs, jobCount };
}
exports.getJobByIdService = async (id) => {
    const jobs = await Job.findById(id).populate('candidate');
    return jobs;
}
exports.updateJobByIdService = async (id, job) => {
    const jobs = await Job.updateOne({ _id: id }, { $set: job });
    return jobs;
}