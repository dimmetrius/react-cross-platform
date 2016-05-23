'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text
} from 'react-native';

export default function () {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  screen: {
    flex: 3,
    flexDirection: 'row',
    alignItems: Platform.OS === 'android' ? 'center' : 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#68cef2',
    padding: 18
  },
  formulae: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#4c4c4c',
    padding: 20
  },
  keyboard: {
    height: 420
  }
});
