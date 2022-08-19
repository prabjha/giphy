import React, {memo} from 'react';
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {Colors} from '@giphy/theme';

import {IGIFCard} from './GifCard.props';
import styles from './GifCard.styles';

const defaultWidth = Dimensions.get('screen').width - 40;
const defaultHeight = Dimensions.get('screen').width - 40;

export const GIFCard = memo(({imageUrl, width, height}: IGIFCard) => {
  const imageW = width ? width : defaultWidth;
  const imageH = height ? height : defaultHeight;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.imageContainer, {width: width}]}>
        <View style={[StyleSheet.absoluteFillObject, styles.loadingContainer]}>
          <ActivityIndicator size={'large'} color={Colors.white} />
        </View>
        <Image
          source={{uri: imageUrl}}
          style={{
            width: imageW,
            height: imageH,
            ...styles.image,
          }}
          resizeMode={'cover'}
        />
      </View>
    </View>
  );
});
