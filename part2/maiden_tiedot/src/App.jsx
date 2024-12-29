import { useState, useEffect } from 'react'
import axios from 'axios'

const Show = ({country}) => {
  if (country) {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      
      <p>area {country.area}</p>

      <h2>languages:</h2>
      <ul>
      {Object.values(country.languages).map((language, index) =>
        <li key={index}>{language}</li>
      )}
      </ul>

      <img src={country.flags.png}></img>
    </>
  )
}}

const Results = ({countries, notification}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const handleToggle = (country) => {
    if (selectedCountry===country) {
      setSelectedCountry(null)

    }
    else {
      setSelectedCountry(country)
    }
  }

  if (notification) {
    return (
      <>
      {notification}
      </>
    )
  }

  else {
    if (countries.length === 1) {
      const country = countries[0]
      return(
      <>
      <Show country={country}></Show>
      </>
      )
    }
    return(
      <>
      {countries.map(country =>
    <p key={country.cca3}>{country.name.common} <button onClick={() => handleToggle(country)}>Show</button></p>
  )}
      <Show country={selectedCountry}></Show>
      </>
)
}
}


function App() {
  const [find, setFind] = useState('')
  const [countries, setCountries] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    if (find) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const found = response.data.filter(country =>
            country.name.common.toLowerCase().startsWith(`${find}`)
          )
          if (found.length > 10) {
            setNotification('Too many matches, specify another filter')
            setCountries([])
          }
          else if (found.length === 1) {
            setNotification(null)
            setCountries(found)
          }
          else {
            setNotification(null)
            setCountries(found)
          }

        })
    }
    else {
      setNotification(null)
      setCountries([])
    }
  }, [find])

  const handleChange = (event) => {
    setFind(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={find} onChange={handleChange}></input>

      </form>
      <Results countries={countries} notification={notification}></Results>
    </div>

  )
}

export default App
