module.exports = {
    hello: () => 'Hello World!',
    test: () => {
        return {
            name: 'R2-D2',
            age: 100,
            type: 'Droid'
        }
    },
    random: args => {
        const { from, to } = args
        return Math.ceil(Math.random() * (from - to) + to)
    }
}