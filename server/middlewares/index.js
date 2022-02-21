const cors = require('cors')
const fileUpload = require('express-fileupload')
const {json} = require('express')
const requestId = require('./requestIdMiddleware')
const routesLogger = require('./routesLoggerMiddleware')

module.exports = (app) => {
    app.use(json());

    app.use(fileUpload({}))

    app.use(cors())

    app.use(requestId)

    app.use(routesLogger)
}


