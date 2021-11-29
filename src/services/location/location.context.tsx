import React, {useState, createContext, useEffect} from "react";
import {locationRequest, locationTransform} from "./location.services";

export const LocationContext = createContext({});

export const LocationContextProvider = ({children})=>{

    const [location, setLocation] = useState([]);
    const [keyword, setKeyword] = useState("San Francisco");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearch = (searchKeyword: string) => {
        setIsLoading(true);
        if(!searchKeyword.length){
            return;
        }

        setKeyword(searchKeyword);     
        locationRequest(searchKeyword.toLowerCase())
        .then(locationTransform)
        .then((result) => {
            setIsLoading(false);
            setLocation(result);
            
        }).catch((err) => {
            setIsLoading(false);
            setError(err);
        })
    }


    useEffect(() => {
        onSearch(keyword);
    }, [])

    return (
        <LocationContext.Provider
            value={{
                isLoading,
                error,
                location,
                search: onSearch,
                keyword,
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}