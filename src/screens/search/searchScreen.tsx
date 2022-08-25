import React, {useCallback, useEffect, useState} from 'react';
import {Routes} from '@giphy/navigation';

import {View} from 'react-native';
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
  Button,
} from '@giphy/components';
import {ISearchScreenProps} from './searchScreen.props';
import {EmptyResult} from '@giphy/components/empty-result';
import styles from './searchScreen.styles';

export const SearchScreen = ({navigation}: ISearchScreenProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const query = useAppSelector(state => state.searchGifs.query) || '';
  const trendingGifs = useAppSelector(selectTrendingGifs);
  const maxPageLimit = useAppSelector(state => state.searchGifs.totalPage);
  const searchedGifs = useAppSelector(selectSearchGifs);
  const trendingGifsStatus = useAppSelector(state => state.trendingGifs.status);
  const searchResultsStatus = useAppSelector(state => state.searchGifs.status);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const currentPage = Math.floor(searchedGifs.length / DEFAULT_LIMIT);

  const [typing, setTyping] = useState(false);
  const [activeview, setActiveview] = useState(false);

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
        await dispatch(fetchGifs({query, page: currentPage})).unwrap();
      } catch {
      } finally {
        setIsFetchingNext(false);
      }
    }
  }, [maxPageLimit, dispatch, currentPage]);

  const errorHandler = useCallback(
    debounce(() => {
      dispatch(fetchTrendingGifs(1));
    }, 250),
    [dispatch],
  );

  const onTyping = useCallback(
    (status: boolean) => {
      setTyping(status);
    },
    [setTyping],
  );

  let content: JSX.Element = <Spinner color={Colors.purple} />;

  if (typing && query.length === 0) content = <View />;
  if (trendingGifsStatus === 'loading') {
    content = <Spinner color={Colors.purple} />;
  } else if (query.length !== 0) {
    if (activeview) {
      content = <Slider data={searchedGifs} disableTitle={true} />;
    } else {
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
    }
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
      {searchedGifs.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button
            style={{
              ...styles.button,
              backgroundColor: !activeview
                ? Colors.lightPink
                : Colors.lightBlack,
            }}
            onPress={
              activeview
                ? () => {
                    setActiveview(false);
                  }
                : undefined
            }
            titleStyle={styles.buttonText}
            title="Grid View"
          />
          <Button
            style={{
              ...styles.button,
              backgroundColor: activeview
                ? Colors.lightPink
                : Colors.lightBlack,
            }}
            onPress={
              !activeview
                ? () => {
                    setActiveview(true);
                  }
                : undefined
            }
            titleStyle={styles.buttonText}
            title="Slide View"
          />
        </View>
      )}
      {content}
      {searchResultsStatus === 'succeed' && SearchResult.length === 0 && (
        <EmptyResult />
      )}
    </Screen>
  );
};
