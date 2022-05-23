//Server runs the final build version of the react application, for server integration to work the project needs to be built 
//by using the npm run build command
const { response } = require('express');
const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const cors = require('cors');
const ZipKey = 'a5874316077a11944ad3fc46576c6e9f';
const fetch = require('node-fetch');
const locationKey = "edd70fd1f4c64a2eb948dddf1937ea0a";
app.use(cors());

require('./routes')(app);//import created routes

app.use(express.static(path.join(__dirname, '/../build')));

app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname, '/../build','index.html'));//route to index upon error404 being thrown react-router does the rest
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../build','index.html'));//route to index  being thrown react-router does the rest
});

app.get('/current-weather', function (req, res) {
    res.sendFile(path.join(__dirname, '/../build','index.html'));//route to index being thrown react-router does the rest
  });


app.use(express.urlencoded({ extended: true }));//used for reading data from form
app.use(express.json());



 app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)//show what port the server is active on
})
