var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
        alarm(id: Int!, userID: Int!): Alarm
        alarms(userID: Int!): [Alarm]
    },
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    },
    type Course {
      id: Int
      title: String
      author: String
      description: String
      topic: String
      url: String
    },
    type Alarm {
      id: Int
      userID: Int
      dateTime: String
      title: String
      note: String
      color: String
    },
    type User {
      id: Int
      name: String
    }
`);

//Data
var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

var alarmData = [
  {
    id: 1,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "green"
  },
  {
    id: 2,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "blue"
  },
]

var updateCourseTopic = ({id, topic}) => {
  coursesData.map(course => {
    if(course.id === id) {
      course.topic = topic;
      return course;
    }
  });
  return coursesData.filter(course => course.id === id)[0];
}

var getAlarm = (args) => {
  if(alarmData.length == 0) return null;
  return alarmData.filter(alarm => {
    return alarm.id === args.id && alarm.userID === args.userID;
  })[0];
}

var getAlarms = (args) => {
  if(args.userID) {
    return alarmData.filter(alarm => alarm.userID === args.userID);
  }
  else {
    return [];
  }
}

// Root resolver
var root = {
    updateCourseTopic: updateCourseTopic,
    alarm: getAlarm,
    alarms: getAlarms
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', cors(), express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
