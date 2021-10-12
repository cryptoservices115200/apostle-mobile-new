import React, { useState } from 'react';
import { View, Pressable, Text } from "react-native";

let timer = null

const Btn = ({left, top, setHPos, LEFTBTN}) => {
    return (
        <Pressable
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
            onPress={() => {
                setHPos(LEFTBTN ? 10 : -10)
            }}
            onLongPress={() => {
                timer = setInterval(() => {
                    setHPos(LEFTBTN ? 10 : -10)
                }, 100)
            }}
            onPressOut={() => {
                clearInterval(timer)
            }}
        >
            <Text style={{fontSize: 30, color: 'white', cursor: 'pointer'}}>{ LEFTBTN ? '<' : '>'}</Text>
        </Pressable>
    )
}

export default Btn;