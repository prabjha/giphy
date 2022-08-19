import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import type {RootState} from '@giphy/redux/store';

import {
  DEFAULT_LIMIT,
  giphyApi,
  IErrorResponse,
  IGIF,
  ILoadingStatus,
  ISearchParam,
  errorHandler,
  formatGIFResponse,
} from '@giphy/services/api';

// initial state using that type
const searchGifsAdapter = createEntityAdapter<IGIF>({
  selectId: entity => entity.id,
});

const initialState = searchGifsAdapter.getInitialState<{
  status: ILoadingStatus;
  query: string;
  error: string;
  totalPage: number; // for pagination last page
}>({
  status: 'idle',
  error: '',
  query: '',
  totalPage: 0,
});

export const searchGifsSlice = createSlice({
  name: 'searchGifs',
  initialState,
  reducers: {
    setGifs(state, action: PayloadAction<IGIF[]>) {
      searchGifsAdapter.setAll(state, action.payload); //replacing entity with new data
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload; //changing the query payload
    },
  },
  extraReducers: builder => {
    //adding case to handle thunk actions

    builder.addCase(fetchGifs.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchGifs.fulfilled, (state, {payload}) => {
      state.status = 'succeed';
      if (payload.update) {
        searchGifsAdapter.upsertMany(state, payload.data);
      } else {
        searchGifsAdapter.setAll(state, payload.data);
        state.totalPage = payload.totalPage;
      }
    });

    builder.addCase(fetchGifs.rejected, (state, action) => {
      state.status = 'failed';
      if (action.payload) {
      } else {
        state.error = '';
      }
    });
  },
});

export const fetchGifs = createAsyncThunk<
  {data: IGIF[]; update: boolean; totalPage: number}, //return type
  ISearchParam, //parameter
  {rejectValue: IErrorResponse}
>('searchGifs/fetch', async (searchParam, thunkApi) => {
  try {
    const response = await giphyApi.search(searchParam);
    const data = formatGIFResponse(response.data.data);
    const totalPage =
      response.data?.pagination?.total_count / DEFAULT_LIMIT || 0;
    let update = false;
    if (searchParam.page && searchParam.page > 0) {
      update = true;
    }
    return {data, update, totalPage};
  } catch (error: any) {
    return thunkApi.rejectWithValue(errorHandler(error));
  }
});

//selectors
export const {selectAll: selectSearchGifs, selectById: selectSearchGifById} =
  searchGifsAdapter.getSelectors((state: RootState) => state.searchGifs);
export const selectSearchGifsStatus = (state: RootState) =>
  state.searchGifs.status;

export const searchGifsAction = searchGifsSlice.actions;

export default searchGifsSlice.reducer;
