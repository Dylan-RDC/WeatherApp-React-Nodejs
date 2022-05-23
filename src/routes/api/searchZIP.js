const fetch = require('node-fetch');
const ZipKey = 'a5874316077a11944ad3fc46576c6e9f';
const express = require('express');
module.exports = (app) => {
    let zip,units,country;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.post('/search',(req,res)=>{ //determines if the zip code, units or country is provided or will throw to error 404
        zip = req.body.zipcode;
        units = req.body.units;
        country = req.body.country
       if(!zip || !units || !country) {
        res.redirect('/error');
      } else { 
        res.redirect('/current-weather');
      }
     });

     app.get('/found-weather',(req,res)=>{ //used to get the zip code's relative weather
        const url =  `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&units=${units}&appid=${ZipKey}`;
        
          fetch(url)
            .then(response => response.json())
            .then(response =>{
              response.units = units; //add unit type to the returned JSON object
               res.send(response)
              })
            .catch(err => {
              res.redirect("/error");
            })
       });
};

