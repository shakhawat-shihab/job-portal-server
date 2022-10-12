const Job = require("../models/Job");

exports.createJobService = async (job) => {
    const result = await Job.create(job);
    return result;
}
exports.getJobByCurrentUserService = async (id) => {
    const jobs = await Job.find({ 'hiringManager.id': id })
        .select('-application -candidate')
        .populate({ path: 'hiringManager.id', select: '-password -role -appliedJob' });
    const jobCount = await Job.countDocuments({ 'hiringManager.id': id })
    return { jobs, jobCount };
}
exports.getJobByIdService = async (id) => {
    const jobs = await Job.findById(id).populate({ path: 'candidate', select: '-password -appliedJob -role' });
    return jobs;
}
exports.updateJobByIdService = async (id, job) => {
    const jobs = await Job.updateOne({ _id: id }, { $set: job });
    return jobs;
}