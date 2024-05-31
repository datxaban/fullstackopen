import { useState, useEffect } from "react"
import countriesService from "./services/countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState(null)

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
          // <p>{filteredCountries[0].name.common}</p>
          <>
            <h1>{filteredCountries[0].name.common}</h1>
            <div>capital {filteredCountries[0].capital[0]}</div>
            <div>area {filteredCountries[0].area}</div>
            <h2>languages</h2>
            <ul>
              {Object.keys(filteredCountries[0].languages).map(key => <li key={key}>{filteredCountries[0].languages[key]}</li>)}
            </ul>
            <img src={filteredCountries[0].flags.png} alt="Flag" />
          </>
        }
      </div>
      {/* <div>
        {!!isSingle &&
          <>
            <h1>{name}</h1>
            <div>capital {captical[0]}</div>
            <div>area {area}</div>
            <h2>languages</h2>
            <ul>
              {languages.map(language => <li key={language.name}>{language}</li>)}
            </ul>
            <img src={flag} alt="Flag" />
          </> 
        }
      </div> */}
    </>
  )
}
export default App