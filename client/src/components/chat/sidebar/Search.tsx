import React from 'react'

const Search = () => {
    return (
        <div className="input-group rounded mb-4 chat-navigation__search">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                aria-describedby="search-addon" />
            <span className="input-group-text border-0" id="search-addon">
                <i className="bi bi-search"></i>
            </span>
        </div>
    )
}

export default Search;