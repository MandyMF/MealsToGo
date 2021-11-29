import React , {useContext,useState, createContext, useEffect, useMemo} from "react";
import { LocationContext } from "../location/location.context";

import { restaurantsRequest, restaurantsTransform } from './restaurant.services';

export const RestaurantsContext = createContext({});

export const RestaurantsContextProvider = ({children})=>{

    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {location} = useContext(LocationContext);

    const retrieveRestaurants = (location) => {
        setIsLoading(true);
        setRestaurants([]);
        setTimeout(()=>{
            restaurantsRequest(location)
                .then(restaurantsTransform)
                .then((results)=> {
                setIsLoading(false);
                setRestaurants(results);
            }).catch((err)=> {
                setIsLoading(false);
                setError(err);
            });
        },1000);
    };

    useEffect(() => {
        if(location){
            const locationString = `${location.lat},${location.lng}`;
            retrieveRestaurants(locationString);
        }
    }, [location])

    return (<RestaurantsContext.Provider 
    value={{
        restaurants,
        isLoading,
        error,
    }}
    >{children}
    </RestaurantsContext.Provider>);
} 