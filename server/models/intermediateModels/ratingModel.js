const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

module.exports = sequelize.define('rating', {
    rate: {type: DataTypes.INTEGER, allowNull: false},
})