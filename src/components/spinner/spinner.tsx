import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {Colors} from '@giphy/theme';

import styles from './spinner.styles';
import {ISpinnerProps} from './spinner.props';

export const Spinner = (props: ISpinnerProps) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={props.color || Colors.white} />
    </View>
  );
};
