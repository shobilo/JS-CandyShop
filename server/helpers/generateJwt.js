const JWT = require('jsonwebtoken')

const generateJwt = (payload) => {
    return JWT.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        {expiresIn: '24h'}
    )
}

module.exports = generateJwt