import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Youtube from 'react-youtube';
import './RowPost.css';

function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlId, setUrlId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(props.url);
                setMovies(response.data.results);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [props.url]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleMovieClick = async (id) => {
        try {
            console.log(movies);
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=0ffb386a852dbf070ac6b977313d8039`);
            if (response.data.results.length !== 0) {
                setUrlId(response.data.results[0].key);
            } else {
                console.log('Array is Empty');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='row'>
            <h2 style={{ paddingTop: '1rem' }}>{props.title}</h2>
            <div className='posters'>
                {movies.map((movie) => (
                    <div className='movie-container' key={movie.id}>
                        <h3 className='movie-title'>{movie.title || movie.name}</h3>
                        <img
                            onClick={() => handleMovieClick(movie.id)}
                            className={props.isSmall ? 'smallPoster' : 'poster'}
                            alt={movie.title}
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        />
                    </div>
                ))}
            </div>

            {urlId && <Youtube opts={opts} videoId={urlId} />}
        </div>
    );
}

export default RowPost;
