import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BrandLogo} from '@giphy/components';
import {SearchScreen, GIFDetailScreen} from '@giphy/screens';

import {Routes, RootStackParamList} from '@giphy/navigation';
import {Colors} from '@giphy/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: props => <BrandLogo />,
          headerStyle: {
            backgroundColor: Colors.charcoal,
          },
          headerTintColor: Colors.white,
        }}>
        <Stack.Screen name={Routes.Search} component={SearchScreen} />
        <Stack.Screen name={Routes.GIFDetail} component={GIFDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
