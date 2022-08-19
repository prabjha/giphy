import React from 'react';
import {Image} from 'react-native';
import styles from './brandLogo.styles';

export const BrandLogo = () => {
  return (
    <Image
      source={require('./logo-dark.png')}
      style={styles.brandLogo}
      resizeMode={'contain'}
    />
  );
};
