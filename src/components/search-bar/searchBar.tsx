import React, {memo, useCallback, useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';

import searchBarStyles from './searchBar.styles';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Colors} from '@giphy/theme';
import {Text} from 'react-native';
import {ISearchBarProps} from './searchBar.props';

export const SearchBar = memo(
  ({search, cancelSearch, query, onTyping, typing}: ISearchBarProps) => {
    const inputRef = useRef<TextInput>(null);
    const [searchText, setSearchText] = useState(query);

    const onCancel = useCallback(() => {
      cancelSearch();
      onTyping(false);
      setSearchText('');
      inputRef.current?.blur();
    }, [inputRef, onTyping, setSearchText]);

    const inputChangeHandler = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        let text = event.nativeEvent.text;
        setSearchText(text);
        search(text);
      },
      [search, setSearchText],
    );

    return (
      <View style={searchBarStyles.container}>
        <View style={searchBarStyles.inputContainer}>
          <View style={searchBarStyles.searchButton}>
            <AntDesignIcon name="search1" size={24} color={Colors.textGrey} />
          </View>
          <TextInput
            ref={inputRef}
            placeholder="Search Cool GIFs"
            placeholderTextColor={Colors.textGrey}
            style={searchBarStyles.searchInput}
            value={searchText}
            onChange={inputChangeHandler}
            onFocus={() => onTyping(true)}
            onBlur={() => onTyping(false)}
          />
        </View>
        {(typing || searchText.length !== 0) && (
          <TouchableOpacity
            style={searchBarStyles.cancelButton}
            activeOpacity={0.6}
            onPress={onCancel}>
            <Text style={searchBarStyles.cancel}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);
