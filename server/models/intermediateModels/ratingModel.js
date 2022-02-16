const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

const Rating = sequelize.define('rating', {
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

module.exports = Rating