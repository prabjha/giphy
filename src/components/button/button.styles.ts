import {Colors, Fonts, Spacing} from '@giphy/theme';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBackground,
    borderRadius: Spacing.small,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.smallPlus,
    minWidth: 144,
    textAlign: 'center',
  },
  title: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    textAlign: 'center',
  },
});
