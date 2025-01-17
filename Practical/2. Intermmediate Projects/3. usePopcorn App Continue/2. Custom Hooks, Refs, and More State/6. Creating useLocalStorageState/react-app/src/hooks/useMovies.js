import { useState, useEffect } from 'react';

const KEY = `44397289`;

export const useMovies = (query, callback)=>
{
    const [movies, setMovies] = useState([]);
    const [ isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>
    {
        callback?.();
        const controller = new AbortController();
        const fetchMovies = async ()=>
        {
            try 
            {
                setError("");
                setIsLoading(true);
                if(query.length < 3)
                {
                    setMovies([]);
                    throw new Error("Please type to search a movie");
                }
                
                const response =   await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });
              
                if(!response.ok && response.status !== 200)
                {
                    throw new Error("Something went wrong with fetching movies");
                }
      
                const data = await response.json();
              
                if(data.Response === 'False')
                {
                    throw new Error(data.Error)
                }
      
                setMovies(data.Search); 
                setError("");
            } 
            catch (error) 
            {
                if (error.name !== "AbortError")
                {
                    setError(error.message);
                }
            }
            finally
            {
                setIsLoading(false); 
            }
        }
          
        
        fetchMovies();
      
        return ()=>
        {
            controller.abort();
        }
      
    }, [query]);

    return { movies, isLoading, error };

}