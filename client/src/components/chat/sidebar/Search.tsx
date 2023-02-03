import React, { useEffect, useState } from 'react'

const Search = ({ handleSearch }: any) => {

    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        handleSearch(search)
    }, [search, handleSearch])

    return (
        <div className="input-group rounded mb-4 chat-navigation__search">
            <input onChange={(e) => setSearch(e.target.value)} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={search} />
            <span className="input-group-text border-0" id="search-addon">
                <i className="bi bi-search"></i>
            </span>
        </div>
    )
}

export default Search;