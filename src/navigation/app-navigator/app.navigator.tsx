import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SearchScreen, GIFDetailScreen} from '@giphy/screens';
import {RootStackParamList, Routes} from '@giphy/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Routes.Search} component={SearchScreen} />
        <Stack.Screen name={Routes.GIFDetail} component={GIFDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
