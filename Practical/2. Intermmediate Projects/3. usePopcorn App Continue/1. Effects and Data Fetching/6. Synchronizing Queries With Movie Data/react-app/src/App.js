import { useState, useEffect } from "react";


import DNALoader from "./components/DNALoader";
import ErrorMessage from "./components/ErrorMessage";

import NavBar from "./components/NavBar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MoviesList from "./components/MoviesList";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import Main from "./components/Main";


const KEY = `44397289`;

const App  = ()=> 
{
  const [movies, setMovies] = useState([]);
  const [ isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState("interstellar");
  const [watched, setWatched] = useState([]);
  useEffect(()=>
  {
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
        const response =   await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        
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
        setError(error.message);
      }
      finally
      {
        setIsLoading(false); 
      }
    }
    
    fetchMovies();
  }, [query]);

  return (
    <>
      <NavBar>
        <Search/>
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
        { isLoading &&  <DNALoader /> }
        { !isLoading && !error && (<MoviesList movies={movies}/>) }
        { error &&  <ErrorMessage message={error}/>}
        </Box> 
        <Box>
          <WatchedSummary watched={watched}/>
          <WatchedList watched={watched}/>
        </Box>
      </Main>
    </>
  );
}

export default App;