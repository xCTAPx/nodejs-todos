const express = require('express')
const path = require('path')

const todosRoute = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/todo', todosRoute)

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.listen(PORT)