import React, { useState, useEffect } from 'react'

import ColorRingLoader from './ColorRingLoader';
import ErrorMessage from './ErrorMessage';
import SelectedMovieDetails from './SelectedMovieDetails';


const KEY = `44397289`;





const MovieDetails = ({ selectedID, onCloseMovie }) => 
{
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    

    useEffect(()=>
    {
      const fetchMovieDetails = async (id) =>
      {
        try 
        {
          setError("");
          setIsLoading(true);

          const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`);

          if(!res.ok && res.status !== 200)
          {
            throw new Error(`Something went wrong with fetching movie with imdbID: ${id}`);
          }

          const data = await res.json();
          
          if(data.Response === 'False')
          {
            throw new Error(data.Error)
          }

          setMovie(data); 
          setError("");
        } 
        catch (error) 
        {
          setError(error.message);
        }
        finally
        {
          setIsLoading(false); 
        }
      }

      fetchMovieDetails(selectedID);
    }, [selectedID]);

    return (
    <div className='details'>
      { isLoading &&  <ColorRingLoader /> }
      { !isLoading && !error && (<SelectedMovieDetails movie={movie} onCloseMovie={onCloseMovie} />) }
      { error &&  <ErrorMessage message={error}/>}
      
    </div>)
}

export default MovieDetails;