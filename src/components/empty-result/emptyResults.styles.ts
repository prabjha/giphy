import {Colors, Fonts, Spacing} from '@giphy/theme';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    marginVertical: Spacing.medium,
    paddingHorizontal: Spacing.small,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
  },
});
