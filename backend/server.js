var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        alarm(id: Int!, userID: Int!): Alarm
        alarms(userID: Int): [Alarm]
    },
    type Mutation {
        createAlarm(userID: Int!, dateTime: String!, title: String!, note: String!, color: String!): Alarm
        updateAlarm(id: Int!, userID: Int!, dateTime: String!, title: String!, note: String!, color: String!): Alarm
        deleteAlarm(id: Int!): Alarm
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

let alarmData = [
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
  {
    id: 2,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "blue"
  },
  {
    id: 2,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "blue"
  },
  {
    id: 2,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "blue"
  },
  {
    id: 2,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "blue"
  },
  {
    id: 2,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "blue"
  },
  {
    id: 2,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "blue"
  },
  {
    id: 2,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "blue"
  },
  {
    id: 2,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "blue"
  },
  {
    id: 2,
    userID: 1,
    dateTime: "2010-10-20 4:30",
    title: "Wake Up",
    note: "Go to class!",
    color: "blue"
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
let idCount = alarmData.length;

var deleteAlarm = ({id}) => {
  alarmData.forEach((alarm, i) => {
    if(alarm.id === id) {
      return alarmData.splice(i,1);
    }
  })
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
    return alarmData;
  }
}

var createAlarm = (args) => {
  let newAlarm = {
    id: idCount++,
    userID: args.userIS,
    dateTime: args.dateTime,
    title: args.title,
    note: args.note,
    color: args.color
  };
  alarmData.push(newAlarm);
  return newAlarm;
}

var updateAlarm = (args) => {
  let alarmIndex = alarmData.findIndex((alarm => alarm.id == args.id));
  //dateTime: String!, title: String!, note: String!, color: String!
  if(args.dateTime) {alarmData[alarmIndex].dateTime = args.dateTime;}
  if(args.title) {alarmData[alarmIndex].title = args.title;}
  if(args.note) {alarmData[alarmIndex].note = args.note;}
  if(args.color) {alarmData[alarmIndex].color = args.color;}

  return alarmData[alarmIndex];
}

// Root resolver
var root = {
    alarm: getAlarm,
    alarms: getAlarms,
    deleteAlarm: deleteAlarm,
    createAlarm: createAlarm
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', cors(), express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
