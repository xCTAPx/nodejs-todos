const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type Hero {
        name: String!
        age: Int!
    }

    type Query {
        test: Hero
        random(from: Int!, to: Int!): Int!
    }
`)

module.exports = schema