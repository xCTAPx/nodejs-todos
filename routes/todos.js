const { Router } = require('express')
const Todo = require('../models/todo')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll()
        todos.map(todo => {
            todo.dataValues.date = todo.dataValues.createdAt
            delete todo.dataValues.createdAt
            delete todo.dataValues.updatedAt
        })
        res.status(200).json(todos)
    } catch(e) {
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            done: false,
        })

        todo.dataValues.date = todo.dataValues.createdAt
        delete todo.dataValues.createdAt
        delete todo.dataValues.updatedAt
        res.status(201).json(todo)
    } catch(e) {
        res.status(500).json({message: 'Server error'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const task = await Todo.findByPk(+req.params.id)
        task.done = !task.done
        await task.save()

        res.json(task)
    } catch(e) {
        res.status(500).json({message: 'Server error'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const task = await Todo.findByPk(+req.params.id)
        await task.destroy()
        res.status(204).json({})
    } catch(e) {
        res.status(500).json({message: 'Server error'})
    }
})

module.exports = router