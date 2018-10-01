var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');
const mysql = require('mysql')
const to = require('await-to-js').default;

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}


const config = {
	host: 'localhost',
	user: 'root',
	password: 'SoftGrayLigh_t0',
	database: 'alarm_me'
}

let database = new Database(config);

var cleanup = require('./cleanup').Cleanup(myCleanup);

// Prevents the program from closing instantly
process.stdin.resume();

function myCleanup() {
	console.log('Cleaning Up...');
	//console.log('Closing MySQL Connection');
	//connection.end();
};

function error() {
  console.log('error');
  var x = require('');
};

// GraphQL schema
var schema = buildSchema(`
    type Query {
        alarm(id: Int!, userID: Int!): Alarm
        alarms(userID: Int!): [Alarm]
    },
    type Mutation {
        createAlarm(userID: Int!, dateTime: String!, title: String!, note: String!, color: String!): Alarm!
        updateAlarm(userID: Int!, id: Int!, dateTime: String, title: String, note: String, color: String): Alarm
        deleteAlarm(userID: Int!, id: Int!): Alarm
		deleteAllAlarms(userID: Int!): [Alarm]!
    },
    type Alarm {
      id: Int!
      userID: Int!
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
  }
]
let idCount = alarmData.length;


var deleteAlarm = async(args) => {
	let alarmDataSQL = [], err = null, sqlQuery, trash;

	sqlQuery = `SELECT * FROM Alarm a WHERE (a.userID = ${args.userID}) AND (a.id = ${args.id})`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	console.log("Test1");
	if(err) return err;

	sqlQuery = `DELETE FROM Alarm WHERE (userID = ${args.userID}) AND (id = ${args.id})`;
	[err, trash] = await to(database.query(sqlQuery));
	console.log("Test2");
	if(err) return err;
	return alarmDataSQL[0];
}

var getAlarm = async(args) => {
	let alarmDataSQL = [], err = null;
	//===args.userID && args.id must be specified to get here===
	let sqlQuery = `SELECT * FROM Alarm a WHERE (a.userID = ${args.userID}) AND (a.id = ${args.id})`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;
	return alarmDataSQL[0];
}

var getAlarms = async(args) => {
	let alarmDataSQL = [], err = null;
	//===args.userID must be specified to get here===
	let sqlQuery = `SELECT * FROM Alarm a WHERE a.userID = ${args.userID}`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;
	return alarmDataSQL;
}

var createAlarm = async(args) => {
	let a = {
		id: idCount++,
		userID: args.userID,
		dateTime: args.dateTime,
		title: args.title,
		note: args.note,
		color: args.color
	};

	let alarmDataSQL = [], err = null, sqlQuery;

	//===args.userID must be specified to get here===
	//===ORDER: id,userID,dateTime,title,note,color===
	sqlQuery = `INSERT INTO Alarm VALUES (${a.id}, ${a.userID}, '${a.dateTime}', '${a.title}', '${a.note}', '${a.color}')`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;

	//Then get that alarm
	sqlQuery = `SELECT * FROM Alarm a WHERE a.id = ${a.id}`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	console.log(alarmDataSQL);
	if(err) return err;
	return alarmDataSQL[0];
}

var updateAlarm = async(args) => {
	let alarmDataSQL = [], err = null, sqlQuery, trash;

	//Get Alarm to Update
	sqlQuery = `SELECT * FROM Alarm a WHERE (a.id = ${args.id}) AND (a.userID = ${args.userID})`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;

	//Doesnt work for some reason
	if(!alarmDataSQL[0]) {
		return ({
			"errors": [
				{
					"message": `No Alarm with id ${args.id} and userID ${args.userID}`
				}
			]
		})
	}

	let a = {
		dateTime: (args.dateTime) ? args.dateTime : alarmDataSQL[0].dateTime,
		title: (args.title) ? args.title: alarmDataSQL[0].title,
		note: (args.note) ? args.note: alarmDataSQL[0].note,
		color: (args.color) ? args.color: alarmDataSQL[0].color
	};

	sqlQuery = `UPDATE Alarm a SET dateTime='${a.dateTime.toISOString()}', title='${a.title}', note='${a.note}', color='${a.color}' WHERE (a.id = ${args.id}) AND (a.userID = ${args.userID})`;
	[err, trash] = await to(database.query(sqlQuery));
	console.log(sqlQuery );
	if(err) return err;

	//Get Updated Alarm
	sqlQuery = `SELECT * FROM Alarm a WHERE (a.id = ${args.id}) AND (a.userID = ${args.userID})`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;

	return alarmDataSQL[0];
}

var deleteAllAlarms = async(args) => {
	let alarmDataSQL = [], err = null, sqlQuery, trash;

	//Get all alarms first to later return
	sqlQuery = `SELECT * FROM Alarm a WHERE a.userID = ${args.userID}`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;

	sqlQuery = `DELETE FROM Alarm`;
	[err, trash] = await to(database.query(sqlQuery));
	if(err) return err;
	return alarmDataSQL;
}

// Root resolver
var root = {
    alarm: getAlarm,
    alarms: getAlarms,
    deleteAlarm: deleteAlarm,
	deleteAllAlarms: deleteAllAlarms,
    createAlarm: createAlarm,
	updateAlarm: updateAlarm
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', cors(), express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.get('/', (req, res) => {
	//console.log(req.query.id);
	//console.log(req.params);

	let whereClause = 'userID';
	if(req.query[whereClause] !== undefined) {
		let search = req.query[whereClause];
		let sqlQuery = `SELECT * FROM Alarm a WHERE a.${whereClause} = ${search}`;
		console.log(sqlQuery);
		connection.query(sqlQuery , (queryError,queryResult,fields) => {
			if(queryError) throw queryError;
			//console.log('The solution is: ', res);
			res.send(queryResult);
		});
	}
	else {
		res.send({error: `Please Provide a query: ${whereClause}`});
	}
});

const PORT = 4000;
app.listen(PORT, () => console.log('Express GraphQL Server Now Running On localhost:PORT/graphql'));
