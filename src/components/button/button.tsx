import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {IButtonProps} from './button.props';
import defaultStyles from './button.styles';

export const Button = (props: IButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[defaultStyles.container, props.style]}
      onPress={props.onPress}>
      <Text style={[defaultStyles.title, props.titleStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};
