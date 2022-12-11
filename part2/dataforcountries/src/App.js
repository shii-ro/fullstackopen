import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({ data, showCountryDetails, selectCountry }) => {

  if (data.length === 1) return (showCountryDetails(data[0]));
  else if (data.length > 10) return <p>Too many matches, specify another result</p>;
  else if (data.length > 1 && data.length <= 10) return (data.map(country =>
    <>
      <p key={country.name.official}>{country.name.common} <button onClick={() => (selectCountry(country.name.common))}>Show</button></p>
    </>
  ))
}

const Weather = ({ country, data, setData }) => {
  const [lat, lon] = country.latlng;
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(response => {
        console.log(response.data)
        const newData = {
          temp: response.data.main.temp,
          icon: response.data.weather[0].icon,
          wind: response.data.wind.speed
        }
        setData(newData);
      })
  }, [])

  return (
    <div>
      <h1>Weather</h1>
      <p>temperature: {data.temp} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}/>
      <p>wind: {data.wind} m/s</p>
    </div>
  )
}

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [weatherData, setWeatherData] = useState([{temp: '', icon: '', wind: ''}]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const showCountryDetails = (country) => {
    return (
      <div>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h4>languages:</h4>
        <ul>
          {Object.values(country.languages).map(language => <li key={country.name.common}>{language}</li>)}
        </ul>
        <img alt='Country Flag' src={country.flags.png} />
        <Weather country={country} data={weatherData} setData={setWeatherData} />
      </div>
    )
  }

  const handleFilter = (e) => {
    const f = e.target.value;
    setFilter(f);
    setFilteredCountries(countriesData
      .filter(country =>
        country.name.common.toLowerCase()
          .includes(f.toLowerCase())))
  }

  const selectCountry = (name) => {
    setFilteredCountries(countriesData.filter(country => country.name.common === name))
  }


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountriesData(response.data);
      })
  }, [])

  return (
    <div>
      <div>find countries <input type={'text'} value={filter} onChange={(e) => handleFilter(e)} /></div>
      <Display data={filteredCountries} showCountryDetails={showCountryDetails} selectCountry={selectCountry} />
    </div>
  )
}

export default App;
