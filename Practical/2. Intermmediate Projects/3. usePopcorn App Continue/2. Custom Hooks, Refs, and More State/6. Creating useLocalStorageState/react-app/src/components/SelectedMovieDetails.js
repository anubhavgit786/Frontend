import React, { useState, useRef, useEffect } from 'react';
import StarRating from "./StarRating";

const SelectedMovieDetails = ({ movie, onCloseMovie, onAddWatched, isWatched, watchedUserRating }) => 
{
    const [userRating, setUserRating] = useState('');
    const countRef = useRef(0);
    const { Title:title, Year:year, Poster:poster, Runtime:runtime, imdbRating, Plot:plot, Released: released, Actors:actors, Director:director, Genre:genre  } = movie;
    
    const handleAddWatched = ()=>
    {
      const newMovie = 
      { 
        imdbID: movie.imdbID, 
        Title : movie.Title, 
        Year: movie.Year, 
        Poster: movie.Poster, 
        runtime: Number(movie.Runtime.split(' ')[0]), 
        imdbRating: Number(movie.imdbRating), 
        userRating, 
        countRatingDecisions: countRef.current
      };
  
      onAddWatched(newMovie);
        
    }

    useEffect(()=>
    {
      if(userRating)
      {
        countRef.current = countRef.current + 1;
      }
    }, [userRating])

    

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
         { !isWatched ? (<> 
          <StarRating maxRatings={10} size={24} onSetRating={setUserRating} />
          { userRating > 0 && ( <button className='btn-add' onClick={handleAddWatched}>+ Add to List</button>)}</>) : (<p>You rated with movie {watchedUserRating} <span>⭐</span></p>)}
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
