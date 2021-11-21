import React from "react";
import Country from "./Country";

const ShowResults = ({countries, setCountries}) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <Country country={countries[0]}/>
        )
    } else {
        return (
            <ul>
                {countries.map((country, i) =>
                    <li key={i}>{country.name.common}<button onClick={() => setCountries([country])}>show</button></li>
                )}
            </ul>
        )
    }
}

export default ShowResults