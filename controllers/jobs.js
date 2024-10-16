const { NotFoundError } = require('../errors')
const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId})
    res.status(StatusCodes.OK).json({jobs})
}
const createJob = async (req, res) => {
    const job = await Job.create({ ...req.body, createdBy: req.user.userId})
    res.status(StatusCodes.CREATED).json({ job })
}
const getJob = async (req, res) => {
    const job = await Job.findOne({ _id: req.params.id,createdBy: req.user.userId})
    if (!job) {
        throw new NotFoundError(`No job found with ${req.params.id} id`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const updateJob = async (req, res) => {
    const { company, position } = req.body
    if (!company || !position) {
        throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Job.findOneAndUpdate(
        { 
            _id: req.params.id,createdBy: req.user.userId
        }, 
            req.body, 
        {
            new: true,
            runValidators: true
        })
    if (!job) {
        throw new NotFoundError(`No job found with ${req.params.id} id`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const deleteJob = async (req, res) => {
    const job = await Job.findOneAndDelete({ _id: req.params.id,createdBy: req.user.userId})
    if (!job) {
        throw new NotFoundError(`No job found with ${req.params.id} id`)
    }
    res.status(StatusCodes.OK).json({ job })
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}