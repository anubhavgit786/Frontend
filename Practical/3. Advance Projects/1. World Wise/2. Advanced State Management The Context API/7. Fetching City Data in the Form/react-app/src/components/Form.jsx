// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useURLPosition } from "../hooks/useURLPosition";
import { useCity } from "../hooks/useCity";

import Button from "./Button";
import BackButton from "./BackButton";
import Flag from "./Flag";
import Spinner from "./Spinner";
import Message from "./Message";

import styles from "./Form.module.css";



const Form = ()=> 
{
  const [lat, lng] = useURLPosition();
  const { isLoading: isLoadingGeocoding, cityName, country, setCityName, emoji, error: geoCodingError } = useCity(lat, lng);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");



  return (
    <form className={styles.form}>
      {isLoadingGeocoding && <Spinner/> }
      { !isLoadingGeocoding && !geoCodingError && (  
      <>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName}/>
        <span className={styles.flag} style={{ color: "black"}}><Flag countryEmoji={emoji} /></span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input id="date" onChange={(e) => setDate(e.target.value)} value={date}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes}/>
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton/>
      </div>
      </>)}
      { geoCodingError && <Message message={geoCodingError} /> }
    </form>
  );
}

export default Form;
