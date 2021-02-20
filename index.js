'use strict';

const Server = require('./scripts/node_js/server').Server;
const Database = require('./scripts/node_js/database').Database;

const database = new Database('cXiZf1YUZTNtMrX8');

const server = new Server(5000, database);

