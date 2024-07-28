import React from 'react';

const StarRating = ({ maxRatings = 5 }) => 
{
    const stars = Array.from({ length: maxRatings }, (_, i)=> i+1);
    const containerStyle = { display: 'flex', alignItems: 'center', gap : '16px' };
    const starContainerStyle = { display: 'flex', gap : '4px' };

    const textStyle = { lineHeight: '1', margin: '0' };
    
    return (
    <div style={containerStyle}>
        <div style={starContainerStyle}>{stars.map((star)=> <span>S{ star}</span>)}</div>
        <p style={textStyle}>{stars.length}</p>
    </div>
  );
}

export default StarRating;
