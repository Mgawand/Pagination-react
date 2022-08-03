import React, { useState} from 'react'

export const Search = ({onSearch}) => {
    const [search, setSearch] = useState("");
    const onInputChange = (value) => {
        setSearch(value);
        onSearch(value);
    }
  return (
    <input type="text" name="" placeholder="Search" value={search} onChange={(e) => onInputChange(e.target.value)}/>
  )
}
