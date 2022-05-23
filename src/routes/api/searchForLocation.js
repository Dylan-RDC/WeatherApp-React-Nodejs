
const fetch = require('node-fetch');
const locationKey = "edd70fd1f4c64a2eb948dddf1937ea0a";

module.exports = (app) => {//api used to get the location from the user's PC and provide a zip/postcode
    app.get('/current-location/:lat/:long',(req,res)=>{
    let latitude = encodeURIComponent(req.params.lat);
    let long = encodeURIComponent(req.params.long);
      let api_url = `https://api.opencagedata.com/geocode/v1/json?key=${locationKey}&q=${latitude},${long}&pretty=1&no_annotations=1`;
      fetch(api_url)
      .then(response => response.json())
      .then(response =>{
         res.send(response);
        })
      .catch(err => {
        res.redirect("/error");
      })
    }
  )
}