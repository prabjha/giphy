import {IGIF} from '@giphy/services/api';

export interface ICarouselProps {
  data: IGIF[];
  width?: number;
  height?: number;
  disableTitle?: boolean;
}
