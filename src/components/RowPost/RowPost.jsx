import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Youtube from "react-youtube";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieModal from "../MovieModal/movieModal";
import "./RowPost.css";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (props.movies) {
      setMovies(props.movies);
    } else {
      axios.get(props.url).then((response) => {
        setMovies(response.data.results);
      }).catch(err => console.log(err));
    }
  }, [props.url, props.movies]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowTrailer(false);
  };

  const fetchTrailerAndShow = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=0ffb386a852dbf070ac6b977313d8039`);
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0].key);
        setShowTrailer(true);
      } else {
        console.log('Trailer not found');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const scroll = (direction) => {
    const scrollAmount = 400;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='row'>
      <h2 style={{ paddingTop: '1rem', color: "white" }}>{props.title}</h2>

      <div className='slider-wrapper'>
        <FaChevronLeft className='scroll-btn left' onClick={() => scroll('left')} />
        <div className='posters' ref={scrollRef}>
          {movies.map((movie) => (
            <div className='movie-container' key={movie.id}>
              <h3 className='movie-title'>{movie.title || movie.name}</h3>
              <img
                onClick={() => handleMovieClick(movie)}
                className={props.isSmall ? 'smallPoster' : 'poster'}
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              />
            </div>
          ))}
        </div>
        <FaChevronRight className='scroll-btn right' onClick={() => scroll('right')} />
      </div>

      {selectedMovie && !showTrailer && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onWatchTrailer={fetchTrailerAndShow}
        />
      )}

      {showTrailer && urlId && (
        <div className="fullscreen-trailer">
          <button className="back-btn" onClick={() => setShowTrailer(false)}>⬅ Back</button>
          <Youtube
            videoId={urlId}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: { autoplay: 1 }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default RowPost;
