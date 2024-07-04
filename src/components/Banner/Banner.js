import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=0ffb386a852dbf070ac6b977313d8039");
                const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)];
                setMovie(randomMovie);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div 
            style={{backgroundImage: `URL(${movie ? 'https://image.tmdb.org/t/p/original/' + movie.backdrop_path : ''})` }}
            className='banner'
        >
            <div className='content'>
                <h1 className='title'>{movie ? movie.title : ''}</h1>
                <div className='banner_buttons'>
                    <button className='button'>Play</button>
                    <button className='button'>My list</button>
                </div>
                <h1 className='description'>{movie ? movie.overview : ''}</h1>
            </div>
            <div className="fade_bottom"></div>
        </div>
    );
}

export default Banner;
