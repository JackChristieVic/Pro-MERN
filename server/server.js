let aboutMessage = 'Issue Tracker API v1.0';
const express = require('express');
// create an Express application/object
const app = express();
const typeDefs = `
    
    type Query {
        about: String!
    }

    type Mutation {
        setAboutMessage(message: String!): String
    }
`;

const resolvers = {
    Query: {
        about: () => aboutMessage,
    },
    Mutation: {
        setAboutMessage: setAboutMessage,
    }
}

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

const { ApolloServer } = require('apollo-server-express');
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.applyMiddleware({ app, path: '/graphql' });

const PORT = 3000;

// using the static middleware function to serve static files in the public folder
const fileServerMiddleware = express.static('public');
app.use('/', fileServerMiddleware);


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})