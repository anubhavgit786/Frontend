import { useEffect, useState } from "react";
function convertToEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";


export const useCity = (lat, lng)=>
{
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [emoji, setEmoji] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    useEffect(() => 
    {
        const fetchCityData = async () => 
        {
            try 
            {
                setError("");
                setIsLoading(true);
                
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                if (!res.ok) 
                {
                    throw new Error("Something went wrong with fetching City");
                }
                
                const data = await res.json();
                
                if (data.Response === "False") 
                {
                    throw new Error("City not found");
                }

                if(!data.countryCode)
                {
                    throw new Error("👋Click somewhere else to get city information 🥲");
                }
                
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
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
        };
        
        fetchCityData();

    }, [lat, lng]);

    return { isLoading, cityName, country, setCityName, emoji, error };
}