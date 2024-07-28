import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const Logo = ()=>
{
  return ( 
  <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>)
}

const Search = ()=>
{
  const [query, setQuery] = useState("");
  return (<input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)}/>)
}


const NumResults = ({ movies })=>
{
  return (<p className="num-results">Found <strong>{ movies.length }</strong> results</p>);
}

const NavBar = ({ movies })=>
{
  
  return (   
  <nav className="nav-bar">
   <Logo/>
    <Search/>
    <NumResults movies={movies} />
  </nav>)
}

const Movie = ({ movie })=>
{
  return ( 
  <li>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>)
}

const MoviesList = ({ movies })=>
{
 
  return (<ul className="list">
    {movies?.map((movie) => (<Movie key={movie.imdbID} movie={movie}/>))}
  </ul>)
}

const ListBox = ({ movies })=>
{
  
  const [isOpen1, setIsOpen1] = useState(true);

  return ( <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen1((open) => !open)}
    >
      {isOpen1 ? "–" : "+"}
    </button>
    {isOpen1 && (<MoviesList movies={movies}/>)}
  </div>);
}

const WatchedSummary = ({ watched })=>
{
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (  
  <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>)
}

const WatchedMovie = ({ movie })=>
{
  return (
  <li>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
    </div>
  </li>)
}

const WatchedList = ({ watched })=>
{
  return ( 
  <ul className="list">
    {watched.map((movie) => (<WatchedMovie key={movie.imdbID} movie={movie} />))}
  </ul>)
}

const WatchBox = ()=>
{
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

 

  return (    
  <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen2((open) => !open)}
    >
      {isOpen2 ? "–" : "+"}
    </button>
    {isOpen2 && (
      <>
      <WatchedSummary watched={watched}/>
       <WatchedList watched={watched}/>
      </>
    )}
  </div>);
}

const Main = ({ movies })=> 
{
  
 

  return ( 
  <main className="main">
  <ListBox movies={movies} /> 
  <WatchBox/>
  </main>);
}

const App  = ()=> 
{
  const [movies, setMovies] = useState(tempMovieData);
 

  return (
    <>
      <NavBar movies={movies} />
     <Main movies={movies}/>
    </>
  );
}

export default App;