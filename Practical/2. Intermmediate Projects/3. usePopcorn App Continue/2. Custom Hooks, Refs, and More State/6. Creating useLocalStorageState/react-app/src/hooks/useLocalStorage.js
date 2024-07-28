import { useState, useEffect } from "react";

export const useLocalStorage = (initialState, key)=>
{
    const [value, setValue] = useState(()=>
    {
        const value = JSON.parse(localStorage.getItem(key)) || initialState;
        return value;
    });

    useEffect(()=>
    {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];

}