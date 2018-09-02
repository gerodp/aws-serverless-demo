'use strict';

const mysql = require('promise-mysql');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function initDB(connection){
    try {
        await connection.query('use myTravelsDB');
    } catch(e) {
        if(e.toString().match(/Unknown database/)){
            console.log('Creating DB as it doesn\'t exists');

            const createDBQueries = await readFile('createSampleDB.sql');

            await connection.query(createDBQueries.toString());

            await connection.query('use myTravelsDB');
        } else {
            throw e;
        }
    }
}

module.exports.queryRDS = async (event, context, callback) => {
    let connection;

    try {
        connection = await mysql.createConnection({
            host     : process.env.DBHOST,
            user     : process.env.DBUSER,
            password : process.env.DBPASSWORD,
            multipleStatements: true
        });
    } catch(e) {
        console.error('Connection error = ' + e.toString());
        callback(e, {});
    }

    await initDB(connection);

    const worldCities = await connection.query('SELECT * from worldCities');

    console.log('WorldCities = ' + JSON.stringify(worldCities));

    await connection.end();

    console.log('Finished');
};
