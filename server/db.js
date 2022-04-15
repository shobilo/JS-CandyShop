const {Sequelize} = require('sequelize')

module.exports = new Sequelize({
  database: "d4salf74f1o6mc",
  username: "arynaqpxgxuihi",
  password: "25152592e439fdd7d9047ce4e7ef01b14504c7d691bb7f85a4608639039e0d89",
  host: "ec2-34-246-227-219.eu-west-1.compute.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
  
})