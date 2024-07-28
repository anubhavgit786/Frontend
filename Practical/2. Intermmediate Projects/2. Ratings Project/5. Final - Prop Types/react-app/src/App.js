import React, { useState } from 'react';
import StarRating from './StarRating';

const Test = ()=>
{
  const [movieRating, setMovieRating] = useState(0);
  return (
  <div>
    <StarRating color='blue' maxRatings={10} onSetRating={setMovieRating} />
    <p>This movie is rated {movieRating} stars.</p>
  </div>)
}

const App = () => {
  return (
    <div>
      <StarRating size={24}/>     
      <StarRating size={24} color='red'/>  
      <StarRating size={24} color='red' messages={['Terrible', 'Bad', 'Okay', 'Good', "Amazing"]}/> 
      <StarRating size={24} color='red' defaultRating={2} />     
      <StarRating maxRatings={10} />
      <StarRating/>  
      <Test/>
    </div>
  );
}

export default App;
