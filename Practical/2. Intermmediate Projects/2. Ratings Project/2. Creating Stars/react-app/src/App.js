import React from 'react';
import StarRating from './StarRating';

const App = () => {
  return (
    <div>
      <StarRating maxRatings={10} />
      <StarRating/>      
    </div>
  );
}

export default App;
