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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.medium,
  },
  button: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
    marginHorizontal: Spacing.medium,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: 16,
    fontWeight: '600',
  },
});
