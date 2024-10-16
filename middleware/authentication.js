const jwt = require('jsonwebtoken')
const { UnauthenticatedError, BadRequestError } = require('../errors')

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new BadRequestError('please provide token')
    }
    try {
        const token = authHeader.split(' ')[1]
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid user')
    }
}

module.exports = authenticate