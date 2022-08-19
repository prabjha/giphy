import {Routes} from '@giphy/navigation';
import {IRootNavigationProp, IRootRouteProp} from '@giphy/navigation';

export interface ISearchScreenProps {
  navigation: IRootNavigationProp<Routes.Search>;
  route: IRootRouteProp<Routes.Search>;
}
