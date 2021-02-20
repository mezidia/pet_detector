'use strict';

const nodemailer = require('nodemailer');
const Database = require('./database').Database;

async function sendMail(link, mailTo,password) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: 'mezgoodle@gmail.com',
      pass: password,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Pet Detector 🐹" <https://pet-detector.herokuapp.com/>', // sender address
    to: mailTo, // list of receivers
    subject: 'We found your pet!', // Subject line
    text: `Maybe, we have founded your pet. Look at this: ${link}`, // plain text body
    html: `Maybe, we have founded your pet. Look at <a href="${link}">this</a>`, // html body
  });
}

async function main() {
  const fields = {'color': 2, 'animal': 4, 'breed': 3, 'date': 1};
  const min = 4;
  /*
  color - 2
  animal - 3
  breed - 4
  date - 1
  min = 4
  */
  const foundedCards = await Database.getAllByTableName('CardFind');
  const lostedCards = await Database.getAllByTableName('CardLost');

  for (const foundedCard of foundedCards) {
    for (const lostedCard of lostedCards) {
      // Do matching
      let matches = 0;
      for (const field of Object.keys(fields)) {
        if (foundedCard[field] === lostedCard[field]) {
          matches += fields[field];
        }
      }
      // Send mail
      if (matches > min) {
        sendMail(`https://pet-detector.herokuapp.com/#found/${lostedCard._id}`, lostedCard.email, '').catch(console.error);
      }
      
    }
  }
}

main();
