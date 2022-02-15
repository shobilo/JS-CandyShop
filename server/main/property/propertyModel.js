const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

module.exports = sequelize.define('property', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
}, {
    indexes: [
        {
            unique: true,
            fields: ['name', 'description']
        }
    ]
})