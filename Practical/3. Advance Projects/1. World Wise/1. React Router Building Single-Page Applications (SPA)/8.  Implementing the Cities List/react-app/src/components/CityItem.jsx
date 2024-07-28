import React from 'react';
import Flag from './Flag';

import styles from "./CityItem.module.css";

const formatDate = (date) =>
{
    return new Intl.DateTimeFormat("en", 
    {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));
}
    

const CityItem = ({ city }) => 
{
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}> <Flag countryEmoji={emoji}/> </span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>)
}

export default CityItem;