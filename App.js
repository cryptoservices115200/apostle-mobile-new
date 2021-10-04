import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// react-native-draggable-flatlist

import TaskSchedular from './component/TaskSchedular1';

export default function App() {
  return (
    <View style={styles.container}>
      <TaskSchedular />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
