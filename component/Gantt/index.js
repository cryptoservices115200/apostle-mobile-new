import React, { Component } from 'react'
import { View } from 'react-native'
import GanttChart from 'react-native-gantt-chart'

class Test extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      tasks: [
        { _id: "1", name: "Task 1", "start": new Date(2018, 0, 1), "end": new Date(2018, 0, 5), progress: 0.25 },
        { _id: "2", name: "Task 2", "start": new Date(2018, 0, 3), "end": new Date(2018, 0, 4), progress: 1 },
        { _id: "3", name: "Task 3", "start": new Date(2018, 0, 5), "end": new Date(2018, 0, 8), progress: 0.5 }
        ]
    }
  }
  
  render() {
    return (
        <GanttChart 
          data={this.state.tasks}
          numberOfTicks={6}
          onPressTask={task => alert(task.name)}
          gridMin={new Date(2018, 0, 1).getTime()}
          gridMax={new Date(2018, 0, 20).getTime()}
          colors={{
            barColorPrimary: '#0c2461',
            barColorSecondary: '#4a69bd',
            textColor: '#fff',
            backgroundColor: '#82ccdd'
          }}
          />
    )
  }
}

export default Test