import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

let data = 
[{
  width1: 200,
  width2: 200,
  color1: 'rgba(0, 255, 255, 0.5)',
  color2: 'rgba(0, 255, 255, 1)',
  marginLeft1: 0,
  marginLeft2: 0,
},
{
  width1: 70,
  width2: 70,
  color1: 'rgba(0, 132, 250, 0.5)',
  color2: 'rgba(0, 132, 250, 1)',
  marginLeft1: 0,
  marginLeft2: 0,
},
{
  width1: 70,
  width2: 70,
  color1: 'rgba(0, 132, 250, 0.5)',
  color2: 'rgba(0, 132, 250, 1)',
  marginLeft1: 70,
  marginLeft2: 0,
},
{
  width1: 75,
  width2: 60,
  color1: 'rgba(0, 132, 250, 0.5)',
  color2: 'rgba(0, 132, 250, 1)',
  marginLeft1: 140,
  marginLeft2: 10,
},
{
  width1: 140,
  width2: 140,
  color1: 'rgba(12, 9, 249, 0.5)',
  color2: 'rgba(12, 9, 249, 1)',
  marginLeft1: 200,
  marginLeft2: 0,
},
{
  width1: 60,
  width2: 60,
  color1: 'rgba(12, 9, 249, 0.5)',
  color2: 'rgba(12, 9, 249, 1)',
  marginLeft1: 200,
  marginLeft2: 0,
},
{
  width1: 55,
  width2: 50,
  color1: 'rgba(12, 9, 249, 0.5)',
  color2: 'rgba(12, 9, 249, 1)',
  marginLeft1: 260,
  marginLeft2: 5,
},
{
  width1: 40,
  width2: 40,
  color1: 'rgba(12, 9, 249, 0.5)',
  color2: 'rgba(12, 9, 249, 1)',
  marginLeft1: 315,
  marginLeft2: 0,
},]

const exampleData = [...data].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  width1: d.width1,
  width2: d.width2,
  backgroundColor1: d.color1,
  backgroundColor2: d.color2,
  marginLeft1: d.marginLeft1,
  marginLeft2: d.marginLeft2,
}));

class HChart extends Component {
  state = {
    data: exampleData
  };

  renderItem = ({ item, index, drag, isActive }) => {
    
    return (
      <View style={{
        marginLeft: item.marginLeft1,
        width: item.width1,
      }}>
        <TouchableOpacity
          onLongPress={drag}
        >
          <View
            style={{
              height: 14,
              marginTop: 2,
              marginRight: 2,
              marginBottom: 2,
              backgroundColor: isActive ? "blue" : item.backgroundColor1,
              borderRadius: 1000,
            }}
          >
            <View style={{
              height: 14,
              width: item.width2, 
              marginLeft: item.marginLeft2,
              backgroundColor: isActive ? "blue" : item.backgroundColor2,
              borderRadius: 1000,
            }}></View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          horizontal={true}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => { this.setState({ data }) }}
        />
      </View>
    );
  }
}

export default HChart;