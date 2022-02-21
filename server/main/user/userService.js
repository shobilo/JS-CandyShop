const bcrypt = require('bcrypt')
const userRepository = require('./userRepository')
const ApiError = require('../../helpers/ApiError')
const generateJwt = require('../../helpers/generateJwt')

class UserService {
    async registration(data) {
        const {email, password, name} = data

        const candidate = await userRepository.readByEmail(email)

        if (candidate) {
            throw ApiError.badRequest("This email is already used in the system")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        try {
            const {user, role} = await userRepository.create({
                email,
                hashedPassword,
                name
            })
    
            const jwtPayload = {
                id: user.id,
                email: user.email,
                name: user.name,
                roles: role
            }
    
            const token = generateJwt(jwtPayload)
    
            return token
        } catch (error) {
            throw ApiError.internal(error.message)
        }

    }

    async login(data) {
        const {email, password} = data

        const user = await userRepository.readByEmail(email)

        if (!user) {
            throw ApiError.badRequest("No such email in database")
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)

        if(!isPasswordCorrect) {
            throw ApiError.badRequest("The password is not true")
        }

        const roles = await user.getRoles()

        const jwtPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: roles
        }

        const token = generateJwt(jwtPayload)

        return token
    }

    async auth({email}) {
        const user = await userRepository.readByEmail(email)

        const roles = await user.getRoles()

        const jwtPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: roles
        }

        const token = generateJwt(jwtPayload)

        return token
    }
}

module.exports = new UserService()