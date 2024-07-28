import React from 'react';
import StarRating from "./StarRating";

const SelectedMovieDetails = ({ movie, onCloseMovie }) => 
{
    const { Title:title, Year:year, Poster:poster, Runtime:runtime, imdbRating, Plot:plot, Released: released, Actors:actors, Director:director, Genre:genre  } = movie;
  return (
    <>
      <header>
        <button className='btn-back' onClick={onCloseMovie}>&larr;</button>
        <img src={poster} alt={title} />
        <div className='details-overview'>
          <h2>{title}</h2>
          <p>{released} &bull; {runtime}</p>
          <p>{genre}</p>
          <p><span>⭐</span>{imdbRating} IMDB Rating</p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRatings={10} size={24} />
        </div>
        <p><em>{plot}</em></p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
        <p>Year {year}</p>
      </section>
    </>
  );
}

export default SelectedMovieDetails;
