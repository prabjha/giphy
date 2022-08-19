import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export interface IScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  statusBar?: 'light-content' | 'dark-content';

  header?: React.ReactNode;
  footer?: React.ReactNode;
}
