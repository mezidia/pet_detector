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
    console.log(name);
    const code = name.split('/');
    if (name === '/lost' || name === '/found') this.returnByTableName(name, res);
    else if (code[1] === 'card') this.addNew(req, name);
    else if (code[0] === 'code') this.returnById(name, res);
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
    response.data = [];
    response.status = name;
    const data = await this.database.getAllByTableName(name);
    for (let i = 0; i < data.length; i++) {
      const card = data[i]._doc;
      response.data[i] = {};
      for (const key in card) {
        if (key === 'email') continue;
        if (key === 'phoneNumber') continue;
        response.data[i][key] = card[key];
      }
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

  async addNew(req, name) {
    name = name.split('/');
    let body = [];
      req.on('data', (chunk) => {
      body.push(chunk);
      }).on('end', async () => {
      body = Buffer.concat(body).toString();
      console.log(body);
      await this.database.addNew(name[1], body);
    });
  }
}

module.exports = { Server };

