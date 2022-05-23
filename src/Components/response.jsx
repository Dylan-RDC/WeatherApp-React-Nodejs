//Used to display response based on inputted information
import React, { Component } from "react";
import "../css/response.css"
import { Link} from 'react-router-dom';

class CurrentWeather extends Component {

  constructor(props) {
		super(props);

		   this.state = ({
		      isLoading: true,
            units:'',
		      Temp: '',
		      humidity: '',
		      wind: '',
		      windDirection: '',
		      currentCondition: '',
		      ConditionDescription: '',
		      Icon: '',
		      city: '',
		      cityNotFound: '',
          country: ''
		   })
	}

    componentDidMount() {
      fetch(`/found-weather`)
      .then(response => response.json())
      .then(response => {
          if (response.cod !== 200) {
              this.setState({
                 isLoading:false,
                 cityNotFound:404
              })
              throw new Error()

          }
       const weatherType = response.weather[0].id;
          let tempSymbol = '';
          let windUnit = '';
          if (response.units==="imperial") {
            tempSymbol = "°F";
            windUnit = "m/h";
          }
          if (response.units==="metric") {
            tempSymbol = "°C"
            windUnit = "m/s";
          }

       this.setState({
        isLoading:false,
        units:response.units,
        currentTemp: Math.round(response.main.temp) + tempSymbol,
        humidity: response.main.humidity + "%",
        wind: Math.round(response.wind.speed) + windUnit,
        windDirection: response.wind.deg,
        Icon :`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
        currentCondition: response.weather[0].main,
        currentConditionDescription: response.weather[0].description,
        city: response.name,
        country : response.country
        });
      })
      .catch(err => {
          console.log(err);
      });
    }

    render() {
      const ErrorPage = (
         <div className='weatherCardContainer'>
           <div className='weatherCardError'>
              <img id="error-logo" src="error.png" alt='no location found'/>
                 <p> Your zipcode was not found...</p>
              <Link to='/'><button id='tryAgain'>Try Again</button></Link>
           </div>
         </div>
      )

      const WeatherConditions = (
        this.state.cityNotFound === 404 ? <div> { ErrorPage } </div> :
        <div>
           <div className='weatherContainer'>
              <div className='weatherDetails'>
              </div> 
             <h4 id='stateCity'>{this.state.city}</h4>
             <div>
          <img src={this.state.Icon} alt='Weather icon'/>
             <div className='conditions'>
                <p id='currentTemp'>{this.state.currentTemp}</p>
                <p id='description'>{this.state.ConditionDescription}</p>
             </div>
             <div className='conditionDetails'>
                <div id='cDetails'>
                  <p id='wLabels'>Humidity</p>
                  <span id='wValues'>{this.state.humidity}</span>
                </div>
                <div id='cDetails'>
                  <p id='wLabels'>Wind Speed</p>
                  <span id='wValues'>{this.state.wind}</span>
                </div>
             </div>
               <Link to='/'><button id='returnBtn'>Return Home</button></Link>
           </div>
           </div>
  
        </div>
      )
  
      const LoadingDisplay = (
         <div className='loading'>
           <p>Loading...</p>
            <img className='loadingIcon' src="loading.png" alt='loading icon'/>
         </div>
      )
  
      const CurrentWeather = ( 
         this.state.isLoading === true ? <div> {LoadingDisplay} </div> : <div> {WeatherConditions} </div>
      )
  
      return (
         <div>
                 { CurrentWeather }
         </div>
      )
    }
  }
export default CurrentWeather;
