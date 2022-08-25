import {StyleSheet} from 'react-native';

import {Colors, Shadow, Fonts, Spacing} from '@giphy/theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
  },

  inputContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    height: '100%',
    borderRadius: Spacing.small,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...Shadow.small,
  },
  searchButton: {
    paddingHorizontal: Spacing.smallPlus,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    color: Colors.textColor,
    fontSize: 18,
    fontFamily: Fonts.regular,
    flex: 1,
  },
  cancelButton: {
    height: '100%',
    padding: Spacing.smaller,
    paddingRight: 0,
    marginLeft: Spacing.smaller,
    justifyContent: 'center'
  },
  cancel: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: Fonts.regular,
    fontWeight: '600',
  },
});
