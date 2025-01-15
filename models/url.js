const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', { // Substitua com suas credenciais
    host: 'localhost',
    dialect: 'postgres'
});

const Url = sequelize.define('Url', {
    originalUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortUrl: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

sequelize.sync(); // Cria a tabela se não existir

module.exports = Url;