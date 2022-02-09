var express = require('express');
var app = express();
var { graphqlHTTP } = require('express-graphql');
var schema = require('./schema');
var myData = require('./data');

const users = myData.module;


const posts = [{
        id: 1,
        title: "This Video is awsome"
    },
    {
        id: 2,
        title: "This Video is 2"
    },
    {
        id: 3,
        title: "This Video is 3"
    }
]
class Message {
    constructor(id, { content, author }) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}
var fakeDatabase = {};
var root = {
    posts: () => posts,
    post: ({ id }) => {
        return posts.find(post => post.id === id);
    },
    users: () => users,
    user: ({ name }) => {
        return users.find(user => user.name === name)
    },
    setMessage: ({ message }) => {
        fakeDatabase.message = message;
        return message;
    },
    getMessage: ({ id }) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }
        return new Message(id, fakeDatabase[id]);
    },
    createMessage: ({ input }) => {

        var id = require('crypto').randomBytes(10).toString('hex');

        fakeDatabase[id] = input;
        return new Message(id, input);
    },
    updateMessage: ({ id, input }) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }

        fakeDatabase[id] = input;
        return new Message(id, input);
    },
}

app.use('/graphql', graphqlHTTP({
    schema: schema.module,
    rootValue: root,
    graphiql: true,
}));


app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');