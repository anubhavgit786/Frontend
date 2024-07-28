import React from 'react';
import WatchedMovie from './WatchedMovie';

const WatchedList = ({ watched, onDeleteWatched })=>
{
    return ( 
    <ul className="list">
        {watched.map((movie) => (<WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched} />))}
    </ul>)
}

export default WatchedList;
