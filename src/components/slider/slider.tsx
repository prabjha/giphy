import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, View, Text, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {GIFCard} from '@giphy/components';
import {IGIF} from '@giphy/services/api/';
import {Colors, Spacing} from '@giphy/theme';
import {WINDOW_WIDTH, GALLERY_IMAGE_SIZE} from '@giphy/constants';

import {ICarouselProps} from './slider.props';
import styles from './slider.styles';

export const Slider = memo((props: ICarouselProps) => {
  const ITEM_WIDTH = props.width ? props.width : WINDOW_WIDTH * 0.9;

  const largeListRef = useRef<FlatList>(null);
  const smallListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    //syncing two list together
    if (
      activeIndex * (GALLERY_IMAGE_SIZE + Spacing.small) -
        GALLERY_IMAGE_SIZE / 2 >
      WINDOW_WIDTH / 2
    ) {
      smallListRef.current?.scrollToOffset({
        offset:
          activeIndex * (GALLERY_IMAGE_SIZE + Spacing.small) -
          WINDOW_WIDTH / 2 +
          GALLERY_IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      smallListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
    largeListRef.current?.scrollToOffset({
      offset: activeIndex * WINDOW_WIDTH,
      animated: true,
    });
  }, [activeIndex, smallListRef, largeListRef]);

  const renderItem = useCallback(({item}: {item: IGIF}) => {
    return (
      <View style={{width: WINDOW_WIDTH}}>
        <GIFCard
          imageUrl={item.images.original.url}
          width={ITEM_WIDTH}
          height={ITEM_WIDTH}
        />
      </View>
    );
  }, []);

  const SliderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="fire"
          size={32}
          color={Colors.white}
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>Trending GIFS</Text>
      </View>
    );
  }, []);

  const renderControls = ({item, index}: {index: number; item: IGIF}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setActiveIndex(index);
        }}
        activeOpacity={0.5}
        style={[
          styles.control,
          {
            borderColor:
              index === activeIndex ? Colors.white : Colors.transparent,
          },
        ]}>
        <Image
          source={{uri: item.images.fixed_width_small.url}}
          style={{
            width: GALLERY_IMAGE_SIZE,
            height: GALLERY_IMAGE_SIZE,
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderEmptyList = useCallback(() => {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.headerTitle}>No Result Found. </Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <SliderHeader />
      <View>
        <FlatList
          ref={largeListRef}
          data={props.data}
          ListEmptyComponent={renderEmptyList}
          getItemLayout={(_, index) => ({
            length: WINDOW_WIDTH,
            offset: WINDOW_WIDTH * index,
            index,
          })}
          contentContainerStyle={styles.listContent}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => {
            setActiveIndex(
              Math.floor(event.nativeEvent.contentOffset.x / WINDOW_WIDTH),
            );
          }}
          renderItem={renderItem}
        />
        <FlatList
          ref={smallListRef}
          data={props.data}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, index) => ({
            length: GALLERY_IMAGE_SIZE,
            offset: (GALLERY_IMAGE_SIZE + Spacing.small) * index,
            index,
          })}
          style={styles.controlsOuter}
          contentContainerStyle={styles.controls}
          renderItem={renderControls}
        />
      </View>
    </View>
  );
});
