'use strict';

const mongoose = require('mongoose');
const found = require('./models/cardFind');
const lost = require('./models/cardLost');

class Database {
  constructor(dbVar) {
    if (Database._instance) return Database._instance;
    Database._instance = this;
    mongoose.connect(
      `mongodb+srv://mezgoodle:${dbVar}@grechkacom.dwpvy.mongodb.net/bestpet?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    this.connection = mongoose.connection;
    this.schemas = [found, lost];

    this.connection.once('open', () => {
      console.log('MongoDB database connection established successfully');
    });

    this.connection.once('close', () => {
      console.log('MongoDB database connection closed successfully');
    });
    return Database._instance;
  }

  async findById(tableName, id) {
    const schemas = this.schemas;
    for (let i = 0; i < schemas.length; i++) {
      if (schemas[i].modelName !== tableName) continue;
      const card = await schemas[i].findById(id);
      if (card) return card;
    }
  }

  async deleteById(tableName, id) {
    const schemas = this.schemas;
    for (let i = 0; i < schemas.length; i++) {
      if (schemas[i].modelName !== tableName) continue;
      await schemas[i].deleteOne(id);
    }
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
