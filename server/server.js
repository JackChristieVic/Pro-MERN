
const fs = require('fs');
const express = require('express');
// create an Express application/object
const app = express();

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

let aboutMessage = 'Issue Tracker API v1.0';
const issuesDB = [    
    {
        id: 1, status: 'New', owner: 'Ravan', effort: 5,         
        created: new Date(' 2018-08-15'), due: undefined,         
        title: 'Error in console when clicking Add'
    },    
    {
        id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,         created: new Date(' 2018-08-16'), due: new Date(' 2018-08-30'),       title: 'Missing bottom border on panel'
    }
];


const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        if(ast.kind == Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
        
    }
  })

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList,
    },
    Mutation: {
        setAboutMessage: setAboutMessage,
        issueAdd,
    },
    GraphQLDate,
}
function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}
function issueList() {
    return issuesDB
}

function issueValidate(issue) {
    const errors = [];
    if(issue.title.length < 4) {
        errors.push('Field "title" must be at least 4 chars long.');
    }else if(issue.status === 'Assigned' && !issue.owner) {
        errors.push('Field "owner" is required when status is "Assigned".');
    }else if(errors.length > 0) {
        throw new UserInputError('Invalid Input(s)', { errors });
    }
}

function issueAdd(_, { issue }) {
    issueValidate(issue);
    issue.created = new Date();
    issue.id = issuesDB.length + 1;
    // if(issue.status == undefined) { issue.status = 'New'}
    issuesDB.push(issue);
    return issue;
}

const { ApolloServer } = require('apollo-server-express');
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    }
})

server.applyMiddleware({ app, path: '/graphql' });

const PORT = 3000;

// using the static middleware function to serve static files in the public folder
const fileServerMiddleware = express.static('public');
app.use('/', fileServerMiddleware);


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})