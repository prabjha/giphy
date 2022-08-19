import {IGIF} from '@giphy/services/api/types';

export interface IGridGalleryProps {
  onCellClick: (gifId: string) => void;
  data: IGIF[] | undefined;
  query: string;
  currentPage: number;
  autoFetchLimit: number;
  onEndReached: () => void;
  maxPageLimit: number;
  isFetching: boolean;
}
