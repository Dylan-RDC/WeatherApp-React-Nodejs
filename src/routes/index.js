const fs = require('fs');
const path = require('path');

module.exports = (app) => {//reads the routes to the server.js
    fs.readdirSync(`${__dirname}/api/`).forEach((file)=>{
      require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
    })
  }