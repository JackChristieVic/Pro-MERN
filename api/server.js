
const fs = require('fs');
const express = require('express');
// create an Express application/object
const app = express();
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost/issuetracker';
// Atlas URL  -replace UUU with user, PPP with password, XXX with hostname 
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true'; 
// mLab URL replace UUU with user, PPP with password, XXX with hostname 

let aboutMessage = 'Issue Tracker API v1.0';
let db;

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
async function issueList() {
    const issues = await db.collection('issues').find({}).toArray();
    return issues;
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

async function issueAdd(_, { issue }) {
    issueValidate(issue);
    const errors = [];
    issue.created = new Date();
    issue.id = await getNextSequence('issues');
    const result = await db.collection('issues').insertOne(issue)
    const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
    return savedIssue;
    // issue.id = issuesDB.length + 1;
    // if(issue.status == undefined) { issue.status = 'New'}
    // issuesDB.push(issue);
    // return issue;
}

async function connectToDb() {
    const client = await new MongoClient(url, { useNewUrlParse: true,  useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB at ', url);
    db = client.db();
}

async function getNextSequence(name) {
    const result = await db.collection('counters').findOneAndUpdate(
        { _id: name },
        { $inc: { current: 1 } },
        { returnOriginal: false },
    );
    return result.value.current;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

const fileServerMiddleware = express.static('public');
// app.use('/', fileServerMiddleware);

server.applyMiddleware({ app, path: '/graphql' });

const PORT = 3000;

// using the static middleware function to serve static files in the public folder

(async function() {
    try {
        await connectToDb();
        app.listen(PORT, () => {
            console.log(`API Server is running on port ${PORT}`)
        });
    } catch (error) {
        console.log('ERROR:', error)
    }
})();


