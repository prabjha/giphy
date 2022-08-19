import {IGIF, ILoadingStatus} from '@giphy/services/api/types';

export interface ISliceState {
  gifs: IGIF[];
  query?: string;
  status: ILoadingStatus;
  error: string;
}
