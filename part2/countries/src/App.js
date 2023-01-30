import {useEffect, useState} from "react";
import axios from "axios";
import Content from "./components/Content";
import Filter from "./components/Filter";

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then(response => {
        const countryNames = response.data;
        setCountries(countryNames)
      })
  }, [])

  useEffect(() => {
    if (filter) {
      const filterCountries = countries.filter(country => country.name.toLowerCase().includes(filter))
      setFilterCountries(filterCountries)
    }
  }, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Content filterCountries={filterCountries} setFilterCountries={setFilterCountries}/>
    </>
  )
}
export default App
