import React from 'react'

const Filter = ({searchWord, handleSearchChange}) => {
    return (
        <div>
            filter shown with <input value={searchWord} onChange={handleSearchChange}/>
        </div>
    )
}

export default Filter