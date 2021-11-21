import React, {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'
import ShowResults from "./components/ShowResults";

function App() {
    const [searchWord, setSearchWord] = useState('')
    const [countries, setCountries] = useState([])
    const [allCountries, setAllCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('promise fulfilled')
                setAllCountries(response.data)
            })
    }, [])

    const handleSearchChange = (event) => {
        setSearchWord(event.target.value)
        if (searchWord) {
            const matchCountries = allCountries.filter(country =>
                country.name.common.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
            setCountries(matchCountries)
        }
    }

    return (
        <div>
            find countries <input value={searchWord} onChange={handleSearchChange}/>
            <ShowResults countries={countries} setCountries={setCountries}/>
        </div>
    )
}

export default App;
