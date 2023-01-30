import {useEffect, useState} from "react";
import axios from "axios";

const Country = ({country}) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
      .then(response => {
        setWeather([response.data])
      })
  }, [country])

  if (weather.length > 0) {
    const temp = (weather[0].main.temp - 273.15).toFixed(2)
    const wind = weather[0].wind.speed
    const icon = weather[0].weather[0].icon
    return (
      <>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <br/>
        <b>languages:</b>
        <ul>
          {country.languages.map(language => <li>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="Country flag" width="100" height="100"></img>
        <h2>Weather in {country.capital}</h2>
        <div>temperature {temp} Celcius</div>
        <img width="100" height="100" src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather icon"></img>
        <div>wind {wind} m/s</div>
      </>
    )
  } else {
    return (
      <>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <br/>
        <b>languages:</b>
        <ul>
          {country.languages.map(language => <li>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="Country flag" width="100" height="100"></img>
        <h2>Weather in {country.capital}</h2>
      </>

    )
  }
}

export default Country