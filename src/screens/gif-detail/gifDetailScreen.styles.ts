import {Colors, Fonts, Spacing} from '@giphy/theme';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gifDetailsContainer: {
    justifyContent: 'center',
    width: '80%',
    padding: Spacing.small,
  },
  gifTitleContainer: {
    marginVertical: Spacing.medium,
  },
  gifTitle: {
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: Colors.white,
  },
});
