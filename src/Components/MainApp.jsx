//Main form that allows for user input
import React, { useState} from 'react';
//import Forecast from "../views/forsecasts";
import '../css/Forecast.css';
import '../css/MainApp.css'




const MainApp = () => {

    let [zip, setZip] = useState('');
    let [country, setCountry] = useState('');
    let [unit, setUnit] = useState('imperial');
 

    function GetLocation() {

    //Get the users location (requires permission)
    if (window.navigator.geolocation) { 
        // Geolocation available
        window.navigator.geolocation
        .getCurrentPosition((data)=>{
            //calls API route we setup in express to find the relative postal/zipcode
            var api_url = `/current-location/${encodeURIComponent(data.coords.latitude)}/${encodeURIComponent(data.coords.longitude)}`;
            fetch(api_url).then(response => response.json())
            .then(response => {
                setZip(response.results[0].components.postcode);
                let countryCode = response.results[0].components.country_code
                setCountry(countryCode.toUpperCase())
                if (response.status.code !== 200) {
                    throw new Error()
                }
        }).catch((error)=>
        {
            console.log(error);
        })
       })
    }
    }

     return (
        <div class='weather-banner'>
        <h2 class='headingTwo'>Find Current Weather Conditions</h2>
        <form method="POST" action='/search'> {/*Form to contain the data and be responsible for posting*/} 
                <div class='inputButton'>
                <input
                    id='countryCode'
                    className="textInput"
                    type="text"
                    placeholder="Country Code"
                    name = "country"
                    maxLength="50"
                    value={country}
                    onChange={(e) => { 
                        if (e.target.value.length < 3) {
                             if (e.target.value==='' || e.target.value.match(/^[A-Za-z]+$/))
                             {
                                 setCountry(e.target.value); //ensure the country code is only letters and 2 digits long
                             }
                        }}}
                />
                <input
                    className="textInput"
                    type="text"
                    placeholder="Enter Zip Code"
                    name = "zipcode"
                    maxLength="50"
                    value={zip}
                    onChange={(e) => {if (!e.target.value.match(/[./#!$%^&*;:{}=_`~()+^(\]|\[)@'"><?]/g)) {setZip(e.target.value)}}}//prevents the user adding any punctiation besides the allowed , and - for postal codes of any country
                />
                <button className='Button' type="submit">Get Forecast</button>
                <button className='Button' type='button' onClick={GetLocation}>Find Current Location</button>
                </div>
                <div class='radioButtons'>
                <input
                    id='fahrenheit'
                    className="Radio"
                    type="radio"
                    name="units"
                    checked={unit === "imperial"}
                    value="imperial"
                    onChange={(e) => setUnit(e.target.value)}
                />
                <label for='fahrenheit' class='RadioLabel' id='fLabel'>Fahrenheit</label>
                <input
                    id='celcius'
                    className='Radio'
                    type="radio"
                    name="units"
                    checked={unit === "metric"}
                    value="metric"
                    onChange={(e) => setUnit(e.target.value)}
                />
                <label for='celcius' class='RadioLabel' id='cLabel'>Celcius</label>
                </div>
                
            </form>
    </div>
    )
}

export default MainApp;