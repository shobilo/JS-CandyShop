const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

module.exports = sequelize.define('image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    data: {type: DataTypes.BLOB, allowNull: false}
})