import React, {useCallback, useEffect, useState} from 'react';

import {Routes} from '@giphy/navigation';
import {DEFAULT_LIMIT} from '@giphy/services/api';
import {
  fetchTrendingGifs,
  selectTrendingGifs,
} from '@giphy/redux/slices/trendingGifs';
import {fetchGifs, selectSearchGifs} from '@giphy/redux/slices/searchGifs';
import {useAppDispatch, useAppSelector} from '@giphy/utils';
import {AUTOFETCH_LIMIT, DEFAULT_Error_Message} from '@giphy/constants';
import {Colors} from '@giphy/theme';
import {debounce} from '@giphy/utils/common/debounce';
import {
  Screen,
  Spinner,
  Header,
  Slider,
  SearchResult,
  Error,
} from '@giphy/components';
import {ISearchScreenProps} from './searchScreen.props';

export const SearchScreen = ({navigation}: ISearchScreenProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const query = useAppSelector(state => state.searchGifs.query) || '';
  const trendingGifs = useAppSelector(selectTrendingGifs);
  const maxPageLimit = useAppSelector(state => state.searchGifs.totalPage);
  const searchedGifs = useAppSelector(selectSearchGifs);
  const trendingGifsStatus = useAppSelector(state => state.trendingGifs.status);
  const searchResultsStatus = useAppSelector(state => state.searchGifs.status);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const currentPage = searchedGifs.length / DEFAULT_LIMIT;

  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (trendingGifsStatus === 'idle') dispatch(fetchTrendingGifs(1));
  }, [dispatch]);

  const onGIFClick = useCallback(
    (gifId: string) => {
      navigation.push(Routes.GIFDetail, {
        gifId,
      });
    },
    [navigation],
  );

  const fetchNext = useCallback(async () => {
    if (currentPage < maxPageLimit) {
      setIsFetchingNext(true);
      try {
        await dispatch(fetchGifs({query, page: currentPage}));
      } finally {
        setIsFetchingNext(false);
      }
    }
  }, [maxPageLimit, dispatch]);

  const errorHandler = useCallback(
    debounce(() => {
      dispatch(fetchTrendingGifs(1));
    }, 500),
    [dispatch],
  );

  const onTyping = useCallback(
    (status: boolean) => {
      setTyping(status);
    },
    [setTyping],
  );

  let content: JSX.Element = <Spinner color={Colors.purple} />;

  if (trendingGifsStatus === 'loading') {
    content = <Spinner color={Colors.purple} />;
  } else if (query.length !== 0) {
    content = (
      <SearchResult
        data={searchedGifs}
        query={query}
        currentPage={currentPage}
        autoFetchLimit={AUTOFETCH_LIMIT}
        onCellClick={onGIFClick}
        maxPageLimit={maxPageLimit}
        onEndReached={fetchNext}
        isFetching={isFetchingNext}
      />
    );
  } else if (query.length === 0 && trendingGifs.length > 0 && !typing) {
    content = <Slider data={trendingGifs} />;
  } else if (
    trendingGifsStatus === 'failed' ||
    searchResultsStatus === 'failed'
  ) {
    content = (
      <Error errorHandler={errorHandler} message={DEFAULT_Error_Message} />
    );
  }

  return (
    <Screen header={<Header typing={typing} onTyping={onTyping} />}>
      {content}
    </Screen>
  );
};
