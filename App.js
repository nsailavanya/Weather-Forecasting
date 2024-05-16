
import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState("");
  const [temperatureResult, setTemperatureResult] = useState("");
  const [humidityResult, setHumidityResult] = useState("");
  
  const changeHandler = (e) => {
    setCity(e.target.value);
  }

  const fetchWeatherData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }

  const submitTemperatureHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchWeatherData();
      const kelvin = data.main.temp;
      const celsius = kelvin - 273.15;
      setTemperatureResult(`Temperature at ${city}: ${Math.round(celsius)}°C`);
    } catch (error) {
      console.log('Error fetching temperature:', error);
      setTemperatureResult('Error fetching temperature');
    }
  }

  const submitHumidityHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchWeatherData();
      const humidity = data.main.humidity;
      setHumidityResult(`Humidity at ${city}: ${humidity}%`);
    } catch (error) {
      console.log('Error fetching humidity:', error);
      setHumidityResult('Error fetching humidity');
    }
  }

  return (
    <div>
      <center>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Weather App</h4>
            <form>
              <input size="30" type="text" name="city" onChange={changeHandler} value={city} /> <br /><br />
              <button onClick={submitTemperatureHandler}>Get Temperature</button> <br /><br />
              <button onClick={submitHumidityHandler}>Get Humidity</button>
            </form> <br /><br />
            <div>
              <h1>{temperatureResult}</h1>
              <h1>{humidityResult}</h1>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}

export default App;

