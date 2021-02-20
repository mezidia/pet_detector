'use strict';

const nodemailer = require('nodemailer');
const Database = require('./database').Database;

const database = new Database('cXiZf1YUZTNtMrX8');

async function sendMail(link, mailTo) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'gmail',
    secure: true,
    auth: {
      user: 'detectorpet@gmail.com',
      pass: 'cXiZf1YUZTNtMrX8',
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Pet Detector 🐹" <https://pet-detector.herokuapp.com/>', // sender address
    to: mailTo, // list of receivers
    subject: 'We found your pet!', // Subject line
    text: `Можливо, ми знайшли вашу тваринку!. Перегляньте це оголошення: ${link}. Щиро ваша команда, Pet Detector.`, // plain text body
    html: `Можливо, ми знайшли вашу тваринку!. Перегляньте це <a href="${link}"> оголошення</a>. Щиро ваша команда, Pet Detector.`, // html body
  });
}

async function findMatches(card) {
  console.log(card);
  const fields = {'color': 2, 'animal': 4, 'breed': 3, 'date': 1};
  const min = 4;
  /*
  color - 2
  animal - 3
  breed - 4
  date - 1
  min = 4
  */
  const lostedCards = await database.getAllByTableName('lost');

  console.log(lostedCards);
  for (const lostedCard of lostedCards) {
    // Do matching
    let matches = 0;
    for (const field of Object.keys(fields)) {
      if (card[field] === lostedCard[field]) {
        matches += fields[field];
      }
    }
    // Send mail
    console.log(matches, min, lostedCard.email);
    if (matches > min) {
      await sendMail(`https://pet-detector.herokuapp.com/#found/${lostedCard._id}`, lostedCard.email).catch(console.error);
    }
    
  }
}

module.exports = findMatches;
