import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface IButtonProps {
  onPress?: () => void | undefined;
  style?: StyleProp<ViewStyle>;
  title: string;
  titleStyle?: TextStyle;
}
