import React, { useState } from 'react';
import './NavBar.css';
import axios from 'axios';

function NavBar({ setSearchResults }) {
    const [query, setQuery] = useState("");

    const handleSearch = async (e) => {
        const searchText = e.target.value;
        setQuery(searchText);

        if (searchText.trim() === "") {
            setSearchResults([]);
            return;
        }

        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/multi?api_key=0ffb386a852dbf070ac6b977313d8039&query=${searchText}`
            );
            setSearchResults(response.data.results);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    return (
        <div className="navbar">
            <div>
                <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo"/>
            </div>

            <div className="nav-links">
                <a href="#home" className='nav-option'>Home</a>
                <a href="#contact" className='nav-option'>Contact</a>
                <a href="#about" className='nav-option'>About</a>
            </div>

            <div className="nav-search">
                <input
                    type="text"
                    placeholder="Search movies or shows..."
                    value={query}
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
}

export default NavBar;
