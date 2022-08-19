import React, {useCallback} from 'react';
import {View} from 'react-native';

import {SearchBar} from '@giphy/components';
import {useAppDispatch, useAppSelector} from '@giphy/utils';
import {debounce} from '@giphy/utils/common/debounce';
import {fetchGifs, searchGifsAction} from '@giphy/redux/slices/searchGifs';

import headerStyles from './header.styles';
import {IHeaderProps} from './header.props';

export const Header = ({onTyping, typing}: IHeaderProps) => {
  const query = useAppSelector(state => state.searchGifs.query) || '';
  const dispatch = useAppDispatch();

  const debounceSearch = useCallback(
    //debouncing function call by 400ms
    debounce((searchText: string) => {
      console.log(searchText);
      if (searchText.length > 0)
        dispatch(fetchGifs({query: searchText, limit: 20}));
      dispatch(searchGifsAction.setQuery(searchText));
    }, 400),
    [],
  );

  const cancelSearch = useCallback(() => {
    //cancelSearch reference will not get change
    dispatch(searchGifsAction.setGifs([]));
    dispatch(searchGifsAction.setQuery(''));
  }, []);

  return (
    <View style={headerStyles.container}>
      <SearchBar
        query={query}
        search={debounceSearch}
        cancelSearch={cancelSearch}
        onTyping={onTyping}
        typing={typing}
      />
    </View>
  );
};
