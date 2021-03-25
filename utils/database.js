const Sequelize = require('sequelize')

const configs = {
    development: {
        username: 'root',
        password: '12345678',
        database: 'todos',
        host: 'localhost',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: '12345678',
        database: 'todos',
        host: 'localhost',
        dialect: 'mysql'
    }
}

const variables = process.env.NODE_ENV === 'development' ? configs.development : configs.production

const sequelize = new Sequelize(variables.database, variables.username, variables.password, {
    host: variables.host,
    dialect: variables.dialect
})

module.exports = sequelize