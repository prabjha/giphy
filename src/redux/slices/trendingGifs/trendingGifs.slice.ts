import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {giphyApi} from '@giphy/services/api';
import {IErrorResponse, IGIF, ILoadingStatus} from '@giphy/services/api/types';

import {
  errorHandler,
  formatGIFResponse,
} from '@giphy/services/api/apiUtilities';

import {RootState} from '@giphy/redux/store';

const trendingGifsAdapter = createEntityAdapter<IGIF>({
  selectId: entity => entity.id,
});

const initialState = trendingGifsAdapter.getInitialState<{
  status: ILoadingStatus;
  error: string;
}>({
  status: 'idle',
  error: '',
});

export const fetchTrendingGifs = createAsyncThunk<
  IGIF[], //thunk return type
  number, //thunk parameter
  {rejectValue: IErrorResponse} //rejected promise type
>('trendingGifs/fetch', async (page, thunkApi) => {
  try {
    const response = await giphyApi.getTrendingGifs(page);
    const gifs = formatGIFResponse(response.data.data);
    return gifs;
  } catch (error: any) {
    //general error handle logic can be written here
    return thunkApi.rejectWithValue(errorHandler(error));
  }
});

export const trendingGifsSlice = createSlice({
  name: 'trendingGifs',
  initialState,
  reducers: {
    setTrendingGifs(state, action: PayloadAction<IGIF[]>) {
      trendingGifsAdapter.setAll(state, action.payload); //replacing set with new entity
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTrendingGifs.pending, state => {
      state.status = 'loading'; //changing loading status
    });
    builder.addCase(fetchTrendingGifs.fulfilled, (state, {payload}) => {
      state.status = 'succeed';
      trendingGifsAdapter.setAll(state, payload);
    });
    builder.addCase(fetchTrendingGifs.rejected, (state, action) => {
      state.status = 'failed';
      state.error = 'Something went wrong. Please try again';
    });
  },
});

//common selector function
export const {selectAll: selectTrendingGifs} = trendingGifsAdapter.getSelectors(
  (state: RootState) => state.trendingGifs,
);
//   action creators
export const trendingGifsAction = trendingGifsSlice.actions;
export default trendingGifsSlice.reducer;
