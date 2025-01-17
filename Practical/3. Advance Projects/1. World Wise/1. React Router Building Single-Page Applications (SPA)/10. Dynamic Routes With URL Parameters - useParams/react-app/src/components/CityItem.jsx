import React from 'react';
import Flag from './Flag';

import styles from "./CityItem.module.css";
import { Link } from 'react-router-dom';

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
  const { cityName, emoji, date, id } = city;
  return (
    <li>
      <Link to={`${id}`} className={styles.cityItem}>
        <span className={styles.emoji}><Flag countryEmoji={emoji}/></span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>)
}

export default CityItem;