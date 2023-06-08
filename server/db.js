const {Sequelize} = require('sequelize')

// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         logging: false,
//     }
// )

module.exports = new Sequelize(
    "postgres://candyshopuser:iuDYM4U5hLifXfXPftdVwpVYLO7v8dQ6@dpg-chs8rhhmbg582k940hm0-a.frankfurt-postgres.render.com/candyshopname", {
        dialect: "postgres",
        dialectOptions: {
            ssl: true
        }
    }
)