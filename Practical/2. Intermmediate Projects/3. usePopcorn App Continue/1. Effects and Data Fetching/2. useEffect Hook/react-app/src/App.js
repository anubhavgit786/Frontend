import { useState, useEffect } from "react";

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
  const [watched, setWatched] = useState([]);
  useEffect(()=>
  {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`).then((response) => response.json()).then((data)=> setMovies(data.Search));
  }, []);

  return (
    <>
      <NavBar>
        <Search/>
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MoviesList movies={movies}/>
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