import React, { useState, useEffect, createContext, useContext } from 'react';

const BASE_URL = `http://localhost:9000`;
const CitiesContext = createContext();

const CitiesProvider = ({ children })=>
{
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=>
    {
      
      const fetchCities = async () =>
      {
        try 
        {
          setError("");
          setIsLoading(true);
          
  
          const res = await fetch(`${BASE_URL}/cities`);
  
          if(!res.ok && res.status !== 200)
          {
            throw new Error("Something went wrong with fetching cities");
          }
          const data = await res.json();
          if(data.Response === 'False')
          {
            throw new Error(data.Error)
          }
          setCities(data); 
          setError("");
        } 
        catch (error) 
        {
            setError(error.message); 
        }
        finally
        {
          setIsLoading(false); 
        }
      }
  
      fetchCities();
  
    }, []);

    return (<CitiesContext.Provider value={{ cities, isLoading, error }}>{ children }</CitiesContext.Provider>);
}

const useCities = ()=>
{
    const context = useContext(CitiesContext);
    if(context === undefined)
    {
        throw new Error("CitiesContext was used outside of Cities Provider");
    }

    return context;
}



export { CitiesProvider, useCities };
