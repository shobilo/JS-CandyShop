const JWT = require('jsonwebtoken')

//TODO fix auth expires on front
const generateJwt = (payload) => {
    return JWT.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        {expiresIn: '24h'}
    )
}

module.exports = generateJwt