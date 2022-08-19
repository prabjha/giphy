import React from 'react';
import {Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Colors, GlobalStyles} from '@giphy/theme';

import {Button} from '@giphy/components';
import {IErrorProps} from './error.props';

import styles from './error.styles';

export const Error = ({errorHandler, message}: IErrorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.errorIconContainer}>
        <MaterialIcons name="error-outline" size={64} color={Colors.white} />
      </View>
      <View style={styles.errorTextContainer}>
        <Text style={styles.errorText}>{message}</Text>
      </View>
      <View>
        <Button
          title={'Try Again'}
          style={GlobalStyles.buttonPrimary}
          titleStyle={GlobalStyles.buttonTitle}
          onPress={errorHandler}
        />
      </View>
    </View>
  );
};
