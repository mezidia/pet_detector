'use strict';

const Database = require('./database').Database;

const database = new Database('cXiZf1YUZTNtMrX8');

async function checkDate(name) {
  const allCards = await database.getAllByTableName(name);
  for (let card of allCards) {
    const insertDate = card.date;
    const diff = Date.now() - insertDate;
    if (diff > 2629800000) await database.deleteById(name, card._id); //2629800000
  } 
}

checkDate('found');
checkDate('lost');
