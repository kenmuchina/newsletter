const { DataTypes } = require('sequelize')

function subscriberModel(sequelize) {
    const attributes = {
        username: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        email: { 
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    return sequelize.define('Subscriber', attributes);
}

module.exports = subscriberModel
