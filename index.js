const express = require('express')
const path = require('path')
const { graphqlHTTP } = require('express-graphql')

const todosRoute = require('./routes/todos')
const sequelize = require('./utils/database')
const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolver')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/todo', todosRoute)

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

const start = async () => {
    try {
        await sequelize.sync()
        app.listen(PORT)
    } catch (e) {
        console.error(e)
    }
}

start()