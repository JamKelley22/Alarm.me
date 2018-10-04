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


var deleteAlarm = async(args) => {
	console.log("DELETE_ALARM");
	let alarmDataSQL = [], err = null, sqlQuery, trash;

	sqlQuery = `SELECT * FROM Alarm a WHERE (a.userID = ${args.userID}) AND (a.id = ${args.id})`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	//console.log("Test1");
	if(err) return err;

	sqlQuery = `DELETE FROM Alarm WHERE (userID = ${args.userID}) AND (id = ${args.id})`;
	[err, trash] = await to(database.query(sqlQuery));
	//console.log("Test2");
	//console.log(alarmDataSQL[0]);
	if(err) return err;
	return alarmDataSQL[0];
}

var getAlarm = async(args) => {
	console.log("GET_ALARM");
	let alarmDataSQL = [], err = null;
	//===args.userID && args.id must be specified to get here===
	let sqlQuery = `SELECT * FROM Alarm a WHERE (a.userID = ${args.userID}) AND (a.id = ${args.id})`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;
	return alarmDataSQL[0];
}

var getAlarms = async(args) => {
	console.log("GET_ALARMS");
	let alarmDataSQL = [], err = null;
	//===args.userID must be specified to get here===
	let sqlQuery = `SELECT * FROM Alarm a WHERE a.userID = ${args.userID}`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;
	return alarmDataSQL;
}

var createAlarm = async(args) => {
	console.log("CREATE_ALARM");
	let a = {
		userID: args.userID,
		dateTime: args.dateTime,
		title: args.title,
		note: args.note,
		color: args.color
	};
	//console.log(a);

	let alarmDataSQL = [], err = null, sqlQuery, trash, newId;

	sqlQuery = `INSERT INTO Alarm (userID, dateTime, title, note, color) VALUES (${a.userID}, '${a.dateTime}', '${a.title}', '${a.note}', '${a.color}')`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;

	sqlQuery = `SELECT LAST_INSERT_ID() as id`
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;

	sqlQuery = `SELECT * FROM Alarm a WHERE (a.id = ${alarmDataSQL.insertId})`;
	[err, alarmDataSQL] = await to(database.query(sqlQuery));
	if(err) return err;
	console.log(alarmDataSQL[0]);
	return(alarmDataSQL[0]);

	/*
	let newAlarm = database.query(sqlQuery)
	.then(rows => {
		sqlQuery = `SELECT LAST_INSERT_ID() as id`
		database.query(sqlQuery)
		.then(rows2 => {
			newId = rows2[0].id;

			//Then get that alarm
			sqlQuery = `SELECT * FROM Alarm a WHERE (a.id = ${newId})`;
			database.query(sqlQuery)
			.then(row3 => {
				console.log(JSON.stringify(row3[0]));
				//============================================================
			})
			.catch(err => {
				console.log(err);
				return err;
			})
		})
		.catch(err => {
			console.log(err);
			return err;
		})
	})
	.catch(err => {
		console.log(err);
		return err;
	})
	*/
}

var updateAlarm = async(args) => {
	console.log("UPDATE_ALARM");
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
app.listen(PORT, () => console.log(`Server Running on /${PORT}/graphql`));
