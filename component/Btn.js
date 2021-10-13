import React from 'react';
import {TouchableOpacity, Text} from "react-native";

let timer = null
const speed = 10
const timestep = 50

const Btn = ({left, top, setHPos, LEFTBTN}) => {
  return (
    <TouchableOpacity
      style={{
        left: left,
        top: top,
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 1000,
        borderColor: 'gray',
        width: 40,
        height: 40,
        backgroundColor: 'rgba(127,127,127,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      activeOpacity={0.6}
      onPress={() => {
        setHPos(LEFTBTN ? speed : -1 * speed)
      }}
      onLongPress={() => {
        timer = setInterval(() => {
          console.log("----")
          setHPos(LEFTBTN ? speed * 2 : -2 * speed)
        }, timestep)
      }}
      onPressOut={() => {
        clearInterval(timer)
      }}
    >
      <Text style={{fontSize: 30, color: 'white', cursor: 'pointer'}}>
        {LEFTBTN ? '' : ''}
      </Text>
    </TouchableOpacity>
  )
}

export default Btn;
