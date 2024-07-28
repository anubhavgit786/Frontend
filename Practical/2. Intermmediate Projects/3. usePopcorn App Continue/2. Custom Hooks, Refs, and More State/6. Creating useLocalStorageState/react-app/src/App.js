import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

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
import MovieDetails from "./components/MovieDetails";






const App  = ()=> 
{
  const [query, setQuery] = useState("interstellar");
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [selectedID, setSelectedID] = useState(null);
  const [watched, setWatched] = useLocalStorage([], "watched");

  const handleSelectMovie = (id)=>
  {
    setSelectedID((selectedID)=> selectedID === id ? null : id);
  }

  function handleCloseMovie()
  {
    setSelectedID(null);
  }

  const handleAddWatched = (movie)=>
  {
    setWatched((watched)=> [...watched, movie]);
  }

  const handleDeleteWatched = (id)=>
  {
    setWatched((watched)=> watched.filter((movie)=> movie.imdbID !== id));
  }
  

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
        { isLoading &&  <DNALoader /> }
        { !isLoading && !error && (<MoviesList movies={movies} onSelectMovie={handleSelectMovie} />) }
        { error &&  <ErrorMessage message={error}/>}
        </Box> 
        <Box>
         { selectedID ? (<MovieDetails selectedID={selectedID} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched} />) : (<> <WatchedSummary watched={watched}/><WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} /></>) } 
        </Box>
      </Main>
    </>
  );
}

export default App;