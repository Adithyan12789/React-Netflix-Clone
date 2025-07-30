import React from 'react';
import './MovieModal.css';

function MovieModal({ movie, onClose, onWatchTrailer }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img className="modal-backdrop" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
        <div className="modal-details">
          <h2>{movie.title || movie.name}</h2>
          <p>{movie.overview || 'No description available.'}</p>
          <div className="modal-buttons">
            <button className="watch-btn" onClick={onWatchTrailer}>Watch Trailer</button>
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
