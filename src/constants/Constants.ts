import {Spacing} from '@giphy/theme';
import {Dimensions} from 'react-native';

export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');

export const FOOTER_HEIGHT = 140;
export const GRID_CELL_WIDTH =
  (WINDOW_WIDTH - Spacing.medium * 2 - Spacing.small) / 2;
export const GALLERY_IMAGE_SIZE = 80;
export const CAROUSEL_ITEM_WIDTH = WINDOW_WIDTH * 0.75;
export const CAROUSEL_ITEM_HEIGHT = CAROUSEL_ITEM_WIDTH * 1.5;

export const AUTOFETCH_LIMIT = 3;

export const DEFAULT_Error_Message = `Something went Wrong! \n Please try again.`;
