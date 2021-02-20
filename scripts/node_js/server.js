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
  constructor(port) {
    if (!Server._instance) {
      Server._instance = this;
  
      this.server = http.createServer();
      this.server.listen(port, () => console.log('Listening on port ' + port));
      this.server.on('request', this.handleRequest);
      const server = this.server;
    }
    return Server._instance;
  }

  //handles request to server
  async handleRequest(req, res) {
    let name = req.url;
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

}

module.exports = { Server };

