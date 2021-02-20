'use strict';

const http = require('http');
const FileManager = require('./fileManager').FileManager;

const fileManager = new FileManager();

const routing = {
  '/': '/index.html'
}
  
const mime = {
  'html': 'text/html',
  'js': 'application/javascript',
  'css': 'text/css',
  'png': 'image/png',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'json': 'text/plain',
  'txt': 'text/plain',
};

class Server {
  constructor(port, database) {
    if (!Server._instance) {
      Server._instance = this;
      this.database = database;
  
      this.server = http.createServer();
      this.server.listen(port, () => console.log('Listening on port ' + port));
      this.server.on('request', (req, res) => this.handleRequest(req, res));
    }
    return Server._instance;
  }

  //handles request to server
  handleRequest(req, res) {
    let name = req.url;
    const code = name.split('/')[0];
    if (name === '/newFound') {
      let body = [];
      req.on('data', (chunk) => {
      body.push(chunk);
      }).on('end', () => {
      body = Buffer.concat(body).toString();
      // at this point, `body` has the entire request body stored in it as a string
      console.log(JSON.parse(body));
      });
    }
    if (name === '/lost' || name === '/found') this.returnByTableName(name, res);
    else if (code === 'code') this.returnById(name, res);
    else this.handleFile(name, res);
  }

  async returnById(name, res) {
    const nameSplit = name.split('/');
    const response = await this.database.getAllByTableName(nameSplit[1], nameSplit[2]);
    res.writeHead(200, { 'Content-Type': `text/plain; charset=utf-8` });
    res.write(JSON.stringify(response));
    res.end();
  }

  async returnByTableName(name, res) {
    name = name.substring(1);
    const response = {};
    const data = await this.database.getAllByTableName(name);
    for (let [key, value] in data) {
      if (key === 'email' || 'phoneNumber' === key) continue;
      response[key] = value;
    }
    res.writeHead(200, { 'Content-Type': `text/plain; charset=utf-8` });
    res.write(JSON.stringify(response));
    res.end();
  }

  async handleFile(name, res) {
    if (routing[name]) name = routing[name];
    let extention = name.split('.')[1];
    const typeAns = mime[extention];
    let data = null;
    data = await fileManager.readFile('.' + name);
    if (data) {
      res.writeHead(200, { 'Content-Type': `${typeAns}; charset=utf-8` });
      res.write(data);
    }
    res.end();
  }

  async addNew() {
    await this.database.addNew('found', { movingMethod: 'fly',
      color: 'yellow',
      breed: 'crocodile',
      description: 'like it',
      email: 'lalala@jjj.com',
      phoneNumber: '09898989'});
  }
}

module.exports = { Server };

