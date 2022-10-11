const User = require("../models/User");


exports.getHiringManagerService = async () => {
    const hiringManagers = await User.find({ role: 'hiring-manager' }).select('-password')
    const totalHiringManagers = await User.countDocuments({ role: 'hiring-manager' })
    return { totalHiringManagers, hiringManagers };
};
exports.getCandidateService = async () => {
    const candidates = await User.find({ role: 'candidate' }).select('-password')
    const totalCandidates = await User.countDocuments({ role: 'candidate' })
    return { totalCandidates, candidates };
};
exports.getCandidateDetailsByIdService = async (id) => {
    const candidates = await User.find({ _id: id }).select('-password').populate({ path: 'appliedJob' })
    return candidates;
};
exports.updateUserRoleService = async (id) => {
    const result = await User.updateOne({ _id: id }, { $set: { role: 'hiring-manager' } })
    console.log(result)
    return result;
};
