require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const router = require('./routes/index')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')
const setupMiddlewares = require('./middlewares')


const PORT = process.env.PORT || 5000

const app = express()

setupMiddlewares(app)

app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()