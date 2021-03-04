const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.json({a: 'get'})
})

router.post('/', (req, res) => {
    res.json({a: 'post'})
})

router.put('/:id', (req, res) => {
    res.json({a: 'put'})
})

router.delete('/:id', (req, res) => {
    res.json({a: 'delete'})
})

module.exports = router