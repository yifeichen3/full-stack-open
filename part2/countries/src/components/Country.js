import React, {useEffect, useState} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({country}) => {
    const [weather, setWeather] = useState(0)
    const capital = country.capital[0]
    const population = country.population
    const countryName = country.name.common
    const languages = Object.keys(country.languages).map(key => country.languages[key])

    useEffect(() => {
        const params = {
            access_key: api_key,
            query: capital
        }
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                setWeather([response.data])
                console.log([response.data])
            })
    }, [])
    console.log("here")
    console.log(weather)
    if (weather && weather.length) {
        const temp = weather[0].current.temperature
        const wind_speed = weather[0].current.wind_speed
        const wind_dir = weather[0].current.wind_dir

        return (
            <div>
                <h1>{countryName}</h1>
                <p>Capital {capital}</p>
                <p>Population {population}</p>
                <h2>Spoken languages</h2>
                <ul>
                    {languages.map((language, i) => <li key={i}>{language}</li>)}
                </ul>
                <img src={country.flags.png} width="100" height="100"/>
                <h2>Weather in {countryName}</h2>
                <p><b>temperature: </b> {temp} Celcius</p>
                <img src={weather[0].current.weather_icons} width="100" height="100"/>
                <p><b>wind: </b>{wind_speed} mph direction {wind_dir}</p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>{countryName}</h1>
                <p>Capital {capital}</p>
                <p>Population {population}</p>
                <h2>Spoken languages</h2>
                <ul>
                    {languages.map((language, i) => <li key={i}>{language}</li>)}
                </ul>
                <img src={country.flags.png} width="100" height="100"/>
            </div>
        )
    }

}

export default Country