import {StyleSheet} from 'react-native';

import {Colors} from './colors';
import {Fonts} from './fonts';
import {Spacing} from './spacing';

export const GlobalStyles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: Colors.lightPink,
  },
  buttonTitle: {
    color: Colors.white,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    fontSize: 18,
  },
  buttonSecondary: {
    backgroundColor: Colors.lightBlack,
  },
});
