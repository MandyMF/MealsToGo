import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';

import { ThemeProvider } from 'styled-components/native';
import {useFonts as useOswald, Oswald_400Regular} from '@expo-google-fonts/oswald' 
import {useFonts as useLato, Lato_400Regular} from '@expo-google-fonts/lato' 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from './src/infrastructure/theme';
import { RestaurantsScreen } from './src/features/restaurants/screens/restaurants.screen';
import {Navigation} from './src/infrastructure/navigation/index';
import { RestaurantsContextProvider } from './src/services/restaurants/restaurant.context';
import { LocationContextProvider } from './src/services/location/location.context';
import { FavouritesContextProvider } from './src/services/favourites/favourites.context';



export default function App() {
  let [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  let [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if(!oswaldLoaded || !latoLoaded){
    return null;
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <FavouritesContextProvider>
      <LocationContextProvider>
      <RestaurantsContextProvider>
        <Navigation />
      </RestaurantsContextProvider>
      </LocationContextProvider>
      </FavouritesContextProvider>
    </ThemeProvider>
    <ExpoStatusBar style="auto" />
    </>
  );
}
