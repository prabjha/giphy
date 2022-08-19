import React, {memo, useCallback, useRef} from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {IGIF} from '@giphy/services/api';

import {Colors, GlobalStyles, Spacing} from '@giphy/theme';
import {WINDOW_WIDTH} from '@giphy/constants';
import {Button, GIFCard} from '@giphy/components';

import {IGridGalleryProps} from './searchResult.props';
import styles from './searchResult.styles';

const GIF_WIDTH = (WINDOW_WIDTH - Spacing.medium * 2 - Spacing.small) / 2;

export const SearchResult = memo(
  ({
    onCellClick,
    query,
    data,
    currentPage,
    autoFetchLimit,
    onEndReached,
    maxPageLimit,
    isFetching,
  }: IGridGalleryProps): JSX.Element => {
    const flatListRef = useRef<FlatList>(null);

    const goToTop = useCallback(() => {
      flatListRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }, [flatListRef]);

    const ListItemSeparator = () => <View style={styles.separator} />;

    const renderListHeader = useCallback(() => {
      return (
        <Text style={styles.title}>
          Search results for
          <Text style={styles.boldText}>{' ' + query.toUpperCase()}</Text>
        </Text>
      );
    }, [query]);

    const renderListItem = useCallback(({item}: ListRenderItemInfo<IGIF>) => {
      return (
        <TouchableOpacity
          style={[styles.listItemContainer, {width: GIF_WIDTH}]}
          activeOpacity={0.6}
          onPress={() => onCellClick(item.id)}>
          <GIFCard
            imageUrl={item.images.fixed_width_small.webp}
            width={GIF_WIDTH}
            height={GIF_WIDTH}
          />
        </TouchableOpacity>
      );
    }, []);

    const renderListFooter = useCallback(() => {
      let content: JSX.Element = <View />;

      if (isFetching) {
        content = (
          <ActivityIndicator size={'large'} animating color={Colors.white} />
        );
      } else if (currentPage >= maxPageLimit) {
        if (data?.length == 0) {
          content = (
            <Text style={{color: Colors.white, textAlign: 'center'}}>
              No Result Found
            </Text>
          );
        }
      } else if (currentPage >= autoFetchLimit && currentPage < maxPageLimit) {
        content = (
          <View style={styles.buttonContainer}>
            <Button
              titleStyle={GlobalStyles.buttonTitle}
              onPress={goToTop}
              title={'Go to Top'}
              style={GlobalStyles.buttonSecondary}
            />
            <Button
              titleStyle={GlobalStyles.buttonTitle}
              title={'Load More'}
              onPress={onEndReached}
              style={GlobalStyles.buttonPrimary}
            />
          </View>
        );
      }

      return <View style={styles.footerContainer}>{content}</View>;
    }, [maxPageLimit, data, isFetching, currentPage]);

    return (
      <SafeAreaProvider style={styles.container}>
        <FlatList
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={{paddingVertical: Spacing.medium}}
          data={data}
          getItemLayout={(_, index) => ({
            length: GIF_WIDTH,
            offset: (GIF_WIDTH + Spacing.small) * index,
            index,
          })}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          maxToRenderPerBatch={5}
          renderItem={renderListItem}
          ItemSeparatorComponent={ListItemSeparator}
          ListFooterComponent={renderListFooter}
          ListHeaderComponent={renderListHeader}
          onEndReachedThreshold={0.5}
          onEndReached={
            currentPage < autoFetchLimit && currentPage < maxPageLimit
              ? onEndReached
              : null
          }
        />
      </SafeAreaProvider>
    );
  },
);
