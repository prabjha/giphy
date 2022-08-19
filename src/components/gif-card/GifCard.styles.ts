import {StyleSheet} from 'react-native';

import {Colors, Shadow, Spacing} from '@giphy/theme';

export default StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: Spacing.smallPlus,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    ...Shadow.larger,
  },
  loadingContainer: {
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: Spacing.smallPlus,
    zIndex: 4,
  },
});
