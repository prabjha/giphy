import {StyleSheet} from 'react-native';

import {Colors, Fonts, Spacing} from '@giphy/theme';
import {GALLERY_IMAGE_SIZE} from '@giphy/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    justifyContent: 'center',
    borderRadius: Spacing.smallPlus,
    borderColor: Colors.borderColor,
    overflow: 'hidden',
  },

  headerContainer: {
    marginHorizontal: Spacing.small,
    marginVertical: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: Colors.white,
  },
  controlsOuter: {
    marginTop: Spacing.large,
  },
  controls: {paddingHorizontal: Spacing.small},
  control: {
    width: GALLERY_IMAGE_SIZE,
    height: GALLERY_IMAGE_SIZE,
    borderRadius: Spacing.small,
    overflow: 'hidden',
    marginRight: Spacing.small,
    borderWidth: 2,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.medium,
    width: '100%',
  },
});
