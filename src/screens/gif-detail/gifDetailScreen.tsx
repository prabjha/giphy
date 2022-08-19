import React from 'react';

import {Text, View, Share, Alert} from 'react-native';

import {GlobalStyles} from '@giphy/theme';
import {useAppSelector} from '@giphy/utils';
import {selectSearchGifById} from '@giphy/redux/slices/searchGifs';
import {Button, GIFCard, Screen} from '@giphy/components/';
import {WINDOW_WIDTH} from '@giphy/constants';

import {IGIFScreenProps} from './gifDetailScreen.props';
import styles from './gifDetailScreen.styles';

export const GIFDetailScreen = ({route}: IGIFScreenProps) => {
  const gifId = route.params.gifId;
  const gif = useAppSelector(state => selectSearchGifById(state, gifId));

  const onShare = async (url: string) => {
    try {
      const result = await Share.share({
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('Error', 'Something Went wrong');
    }
  };

  const ITEM_WIDTH = WINDOW_WIDTH * 0.9;
  const ITEM_HEIGHT = ITEM_WIDTH * 1.3;
  if (!gif) return null;
  return (
    <Screen>
      <View style={[styles.container, styles.center]}>
        <GIFCard
          imageUrl={gif.images.original.webp}
          width={ITEM_WIDTH}
          height={ITEM_HEIGHT}
        />
        <View style={styles.gifDetailsContainer}>
          <View style={styles.gifTitleContainer}>
            <Text style={styles.gifTitle} ellipsizeMode={'tail'}>
              {gif.title}
            </Text>
          </View>
          <Button
            onPress={() => {
              onShare(gif.bitly_url);
            }}
            title="Share"
            style={GlobalStyles.buttonPrimary}
            titleStyle={GlobalStyles.buttonTitle}
          />
        </View>
      </View>
    </Screen>
  );
};
