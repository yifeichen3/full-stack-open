import Country from "./Country";

const Content = ({filterCountries, setFilterCountries}) => {
  if (filterCountries.length > 10) {
    return (
      <>
        <div>Too many matches, specify another filter</div>
      </>
    )
  } else if (filterCountries.length > 1) {
    return (
      <>
        {filterCountries.map((filterCountry, id) => <div key={id}>{filterCountry.name} <button onClick={() => {setFilterCountries([filterCountry])}}>show</button></div>)}
      </>
    )
  } else if (filterCountries.length === 1) {
    return (
      <>
        <Country country={filterCountries[0]} />
      </>
    )
  }
}

export default Content