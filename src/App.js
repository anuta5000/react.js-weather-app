import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = "82b797b6ebc625032318e16f1b42c016";

class App extends React.Component {
    
  state = {
    temp:undefined,
    city:undefined,
    country:undefined,
    sunrise:undefined,
    sunset:undefined,
    error:undefined
  }  
    
    
  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
  
    if (city) {    
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      //const link = "https://api.openweathermap.org/data/2.5/weather?q=Kiev,ua&appid=82b797b6ebc625032318e16f1b42c016&units=metric";
      const data = await api_url.json();
      
 
      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  
      this.setState({
        temp: data.main.temp,
        name: data.name,
        country: data.sys.country,
        sunrise: data.sys.sunrise,
        sunset: sunset_date,
        error: undefined
      });
    } else {
      this.setState({
        temp:undefined,
        city:undefined,
        country:undefined,
        sunrise:undefined,
        sunset:undefined,
        error:"Введите название города"
      });
    }
  }
  
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp = {this.state.temp}
                  city = {this.state.name}
                  country = {this.state.country}
                  sunrise = {this.state.sunrise}
                  sunset = {this.state.sunset}
                  error = {this.state.error}
                 />
              </div>
             </div>
           </div>
         </div>
      </div>
    );
  }
}

export default App;
