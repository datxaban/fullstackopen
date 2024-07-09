import { useState, useEffect } from "react"
import countriesService from "./services/countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState(null)
  const [weather, setWeather] = useState(null)
  const [wind, setWind] = useState(0)
  const [temperature, setTemperature] = useState(0)
  const [icon, setIcon] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setCountries([...countries])
      })
  },[])

  useEffect(() => {
    if(filter){
      const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
      setFilteredCountries(filtered)
    }
  }, [filter])

  useEffect(() => {
    if(filteredCountries.length === 1){
      const city = filteredCountries[0].capital[0]
      countriesService
        .getWeather(city)
        .then(weather => {
          setWeather(weather)
          setIcon(weather.weather[0].icon)
          setWind((weather.wind.speed/3.6).toFixed(1)); 
          setTemperature((weather.main.temp - 273.15).toFixed(1));
        })
    }
  }, [filteredCountries])


  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleShow = (name) => {
    handleFilter({target: {value: name}})
  }

  return (
    <>
      <form>
        <label>find countries</label>
        <input type="text" onChange={handleFilter}/>
      </form>
      <div>
        {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
        {filteredCountries.length <= 10 && filteredCountries.length >1 && filteredCountries.map(country => 
          <p key={country.name.common}>{country.name.common} <button onClick={()=>handleShow(country.name.common)}> show </button>  </p>
        )}
        {filteredCountries.length === 1 && 
          <>
            <h1>{filteredCountries[0].name.common}</h1>
            <div>capital {filteredCountries[0].capital[0]}</div>
            <div>area {filteredCountries[0].area}</div>
            <h2>languages</h2>
            <ul>
              {Object.keys(filteredCountries[0].languages).map(key => <li key={key}>{filteredCountries[0].languages[key]}</li>)}
            </ul>
            <img src={filteredCountries[0].flags.png} alt="Flag" />
            {weather &&
              <>
                <h2>Weather in {filteredCountries[0].capital[0]}</h2>
                <div><strong>temperature:</strong> {temperature} Celsius</div>
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Flag" />
                <div><strong>wind:</strong> {wind} m/s</div>
              </>
            
            }
          </>
        }
      </div>
    </>
  )
}
export default App