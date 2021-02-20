'use strict';

const nodemailer = require('nodemailer');
const Database = require('./database').Database;

const database = new Database('cXiZf1YUZTNtMrX8');

async function sendMail(link, mailTo) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: 'detectorpet@gmail.com',
      pass: 'cXiZf1YUZTNtMrX8',
    },
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: '"Pet Detector 🐹"', // sender address
    to: mailTo, // list of receivers
    subject: 'We found your pet!', // Subject line
    html: `Можливо, ми знайшли вашу тваринку!. Перегляньте це <a href="${link}"> оголошення</a>. Щиро ваша команда, Pet Detector.`, // html body
  }, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

async function findMatches(card, cardtype, id, email) {
  const fields = {'color': 2, 'animal': 4, 'breed': 3, 'date': 1};
  const min = 4;
  /*
  color - 2
  animal - 3
  breed - 4
  date - 1
  min = 4
  */

  let type = cardtype;
  if (cardtype === 'lost') type = 'found';
  else type = 'lost';
  const lostedCards = await database.getAllByTableName(type);

  for (const lostedCard of lostedCards) {
    // Do matching
    let matches = 0;
    for (const field of Object.keys(fields)) {
      if (card[field] === lostedCard[field]) {
        matches += fields[field];
      }
    }
    // Send mail
    if (matches > min) {
      await sendMail(`https://pet-detector.herokuapp.com/#${type}/${lostedCard._id}`, lostedCard.email).catch(console.error);
      await sendMail(`https://pet-detector.herokuapp.com/#${cardtype}/${id}`, email).catch(console.error);
    }
    
  }
}

module.exports = findMatches;
