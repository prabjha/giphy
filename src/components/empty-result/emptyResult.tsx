import React from 'react';
import {Text, View} from 'react-native';
import styles from './emptyResults.styles';

export const EmptyResult = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Result Found</Text>
    </View>
  );
};
