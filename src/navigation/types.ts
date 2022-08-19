import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Routes} from '@giphy/navigation';

export type RootStackParamList = {
  [Routes.Search]: undefined;
  [Routes.GIFDetail]: {gifId: string};
};

type IRootRoute = keyof RootStackParamList;

export type IRootNavigationProp<R extends IRootRoute> =
  NativeStackNavigationProp<RootStackParamList, R>;
export type IRootRouteProp<R extends IRootRoute> = RouteProp<
  RootStackParamList,
  R
>;
