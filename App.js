import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// react-native-draggable-flatlist

import TaskSchedular from './component/TaskSchedular1';
// import Gantt from './component/Gantt';
import GanttWeb from './component/GanttWeb';
import Temp from './component/TaskSchedular_deprecated';
import Moving from './component/Moving';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Temp /> */}
      {/* <Moving /> */}
      {/* <GanttWeb /> */}
      {/* <TaskSchedular /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
