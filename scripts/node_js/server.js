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

  async returnByTableName(name, res) {
    console.log(name);
    const data = await this.database.getAllByTableName(name);
    console.log(data);
    res.writeHead(200, { 'Content-Type': `text/plain; charset=utf-8` });
    res.write(data);
    res.end();
  }

  //handles request to server
  async handleRequest(req, res) {
    let name = req.url;
    await this.returnByTableName('found', null);
    if (name === 'lost' || name === 'found') this.returnByTableName(name, res);
    else if (routing[name]) await this.handleFile(name, res);
  }

  async handleFile(name, res) {
    name = routing[name];
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

