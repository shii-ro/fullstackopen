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

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
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
