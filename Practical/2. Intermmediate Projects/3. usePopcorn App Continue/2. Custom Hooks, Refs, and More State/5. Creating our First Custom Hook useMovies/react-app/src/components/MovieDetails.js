import React, { useEffect } from 'react'
import { useMovie } from '../hooks/useMovie'

import ColorRingLoader from './ColorRingLoader';
import ErrorMessage from './ErrorMessage';
import SelectedMovieDetails from './SelectedMovieDetails';








const MovieDetails = ({ selectedID, onCloseMovie, onAddWatched, watched }) => 
{
    const { movie, isLoading, error } = useMovie(selectedID);

    const { Title:title } = movie;
    
    const isWatched = watched.map((movie)=> movie.imdbID).includes(selectedID);
    const watchedUserRating = watched.find((movie)=> movie.imdbID === selectedID)?.userRating;

    useEffect(()=>
    {
      if(!title)
      {
        return;
      }
        
      document.title = `Movie | ${title}`;
        
      return ()=>
      {
        document.title = "usePopcorn";
      }
  
    }, [title]);
  
    useEffect(()=>
    {
      const callback = (e)=>
      {
        if (e.code === 'Escape')
        {
          onCloseMovie();
        }
      }
  
      document.addEventListener('keydown', callback);
  
      return ()=>
      {
        document.removeEventListener('keydown', callback);
      }
  
    }, [onCloseMovie])
  


    return (
    <div className='details'>
      { isLoading &&  <ColorRingLoader /> }
      { !isLoading && !error && (<SelectedMovieDetails movie={movie} onCloseMovie={onCloseMovie} onAddWatched={onAddWatched} isWatched={isWatched} watchedUserRating={watchedUserRating} />) }
      { error &&  <ErrorMessage message={error}/>}
      
    </div>)
}

export default MovieDetails;
