import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './screen.styles';
import {IScreenProps} from './screen.props';

export const Screen = (props: IScreenProps) => {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      {props.header && props.header}
      {props.children}
      {props.footer && props.footer}
    </SafeAreaView>
  );
};
