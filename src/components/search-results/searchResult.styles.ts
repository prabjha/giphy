import {StyleSheet} from 'react-native';

import {Colors, Fonts, Shadow, Spacing} from '@giphy/theme';
import {FOOTER_HEIGHT} from '@giphy/constants';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: Spacing.medium,
    borderColor: Colors.white,
    ...Shadow.small,
  },
  boldText: {
    fontFamily: Fonts.bold,
    fontWeight: '600',
    fontSize: 18,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    marginBottom: Spacing.smallPlus,
    fontFamily: Fonts.regular,
    width: '100%',
    marginRight: 5,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: FOOTER_HEIGHT,
  },
  footerText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: Spacing.medium,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  separator: {
    height: Spacing.small,
  },

  list: {
    flex: 1,
    paddingBottom: Spacing.hugeXPlus,
  },

  listItemContainer: {
    borderRadius: Spacing.smallerXPlus,
    overflow: 'hidden',
    overlayColor: Colors.white,
  },
});
