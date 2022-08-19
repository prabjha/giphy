import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import searchGifsReducer from './slices/searchGifs/searchGifs.slice';
import trendingGifsReducer from './slices/trendingGifs/trendingGifs.slice';

export const store = configureStore({
  reducer: {
    trendingGifs: trendingGifsReducer,
    searchGifs: searchGifsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; //type of root state
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
