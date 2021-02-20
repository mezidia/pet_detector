'use strict';

const mongoose = require('mongoose');
const CardFind = require('./models/cardFind');
const CardLost = require('./models/cardLost');

class Database {
  constructor(dbVar) {
    if (Database._instance) return Database._instance;
    Database._instance = this;
    mongoose.connect(
      `mongodb+srv://mezgoodle:${dbVar}@grechkacom.dwpvy.mongodb.net/database?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    this.connection = mongoose.connection;
    this.schemas = [CardFind, CardLost];

    this.connection.once('open', () => {
      console.log('MongoDB database connection established successfully');
    });

    this.connection.once('close', () => {
      console.log('MongoDB database connection closed successfully');
    });
    return Database._instance;
  }

  //get all data by table name from db
  async getAllByTableName(tableName) {
    const schemas = this.schemas;
    for (let i = 0; i < schemas.length; i++) {
      if (schemas[i].modelName !== tableName) continue;
      const all = await schemas[i].find({});
      if(all) return all;
    }
  }

  //creates new table in database based on name of table
  //input example ('Category', {categoryType: 'ketchup'}), first arg string, second arg object
  //returns new object
  async addNew(tableName, args) {
    const schemas = this.schemas;
    for (let i = 0; i < schemas.length; i++) {
      if (schemas[i].modelName !== tableName) continue;
      let result = null;
      try {
        const model = new schemas[i](args);
        result = await model.save();
      } catch (err) {
        console.error(err);
      }
      return result;
    }
    return null;
  }
  
}

module.exports = { Database };
