import {StyleSheet} from 'react-native';

import {Colors, Fonts, Spacing} from '@giphy/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
  },
  errorIconContainer: {
    alignItems: 'center',
    marginBottom: Spacing.large,
  },
  errorTextContainer: {
    marginBottom: Spacing.large,
    width: '80%',
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 22,
  },
});
