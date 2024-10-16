const { getAllJobs, createJob, getJob, updateJob, deleteJob } = require('../controllers/jobs')
const authenticate = require('../middleware/authentication')
const router = require('express').Router()

router.use(authenticate)
router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router