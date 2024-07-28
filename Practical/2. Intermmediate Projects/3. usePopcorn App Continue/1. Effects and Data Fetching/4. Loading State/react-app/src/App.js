import { useState, useEffect } from "react";


import DNALoader from "./components/DNALoader";
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
  const [watched, setWatched] = useState([]);
  useEffect(()=>
  {
    const fetchMovies = async ()=>
    {
      try 
      {
        setIsLoading(true);
        const resonse =   await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`);
        const data = await resonse.json();
        setMovies(data.Search);
        setIsLoading(false);
      } 
      catch (error) 
      {
        
      }
    }
    
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Search/>
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
        { isLoading ? (<DNALoader/>): (<MoviesList movies={movies}/>) }
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