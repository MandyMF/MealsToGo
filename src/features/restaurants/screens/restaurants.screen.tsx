import React, {useContext, useState} from 'react';
import {  ActivityIndicator, Colors } from 'react-native-paper';
import { FlatList, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import { RestaurantInfoCard } from '../components/restaurant-info-card.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { RestaurantsContext } from '../../../services/restaurants/restaurant.context';
import { Search } from '../components/search.component';
//import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { FavouritesBar } from '../../../components/favourites/favourite-bar.component';
import { FavouritesContext } from '../../../services/favourites/favourites.context';

const RestaurantList =styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  }
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({navigation}) => {
  const {isLoading, error, restaurants} =  useContext(RestaurantsContext);
  const [isToggle, setIsToggle] = useState(false);
  const {favourites} = useContext(FavouritesContext);

  return (
    <SafeArea>
    { isLoading &&
      <LoadingContainer >
        <Loading
          size={50}
          animating={true}
          color={Colors.blue300}
        />

      </LoadingContainer>
    }
      <Search isFavouritesToggle={isToggle} onFavouritesToggle= {()=>setIsToggle(!isToggle)}/>
        {
        isToggle &&
         <FavouritesBar favourites={favourites}  onNavigate={navigation.navigate}/>
         }
        <RestaurantList
          data={restaurants}
          renderItem={({item})=> {
                            return (
                            <TouchableOpacity onPress={()=> 
                              navigation.navigate("RestaurantDetail", {
                              restaurant: item,
                            })}>
                            <Spacer position='bottom' size='large'>
                              <RestaurantInfoCard restaurant={item} />
                            </Spacer>
                            </TouchableOpacity>)
                            }
          }
          keyExtractor={(item) => item.name}
        />
    </SafeArea>
);
}
