import React, { useRef, useState } from "react";
import { Animated, PanResponder, View, } from "react-native";

const floorStep = 18;

const offsetX = 280; // 1/3
const offsetY = 190; // 1/5

const nearestFloor = (y_height) => {
    let calculated = Math.round(y_height / floorStep) * floorStep
    return calculated < 0 ? 0 : calculated
}

const DraggableView = ({id, x, y, width1, width2, color1, color2, marginX, existingData, updateData, toggleSliding}) => {
    console.log({ x1: Number.parseFloat(x).toFixed(0), y: y, x2: x.toFixed(0) + width1});
  const pan = useRef(new Animated.ValueXY({x: x, y: y})).current;
  const [startPos, setStartPos] = useState({pan_x0: 0, pan_y0: 0});
  const [pressed, setPressed] = useState(false);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderStart: (gesture, gestureState) => {
        toggleSliding(false);
        setStartPos({
            pan_x0: pan.x._value,
            pan_y0: pan.y._value,
        })
    },
    onPanResponderMove: (gesture, gestureState) => {
        pan.setValue({
            x: startPos.pan_x0 + gestureState.dx,
            y: nearestFloor(startPos.pan_y0 + gestureState.dy),
        })
    },
    onPanResponderRelease: (gesture, gestureState) => {
        console.log("end")
        // Checking Valid Position
        let valid = true
        let nearestPos = 0;

        for (let i = 0; i < existingData.length; i ++) {
            if (Math.abs(existingData[i].y - startPos.pan_y0 - gestureState.dy) < floorStep/2.0) {   
                if (id == existingData[i].id) {
                    continue;
                }
                // The overlayed floor(main)
                if (
                    (startPos.pan_x0 + gestureState.dx < existingData[i].x && existingData[i].x < startPos.pan_x0 + gestureState.dx + width1) || // 
                    (startPos.pan_x0 + gestureState.dx < (existingData[i].x + existingData[i].width1) && (existingData[i].x + existingData[i].width1) < startPos.pan_x0 + gestureState.dx + width1) || 
                    (existingData[i].x < (startPos.pan_x0 + gestureState.dx) && (startPos.pan_x0 + gestureState.dx + width1) < existingData[i].x + existingData[i].width1) || 
                    ((startPos.pan_x0 + gestureState.dx) < existingData[i].x && (existingData[i].x + existingData[i].width1) < (startPos.pan_x0 + gestureState.dx + width1))
                ) {
                    valid = false;
                    break;
                }
            } else {
                for (let j = 0; j < existingData[i].sublanes.length; j ++) {
                    if (Math.abs(existingData[i].sublanes[j].y - startPos.pan_y0 - gestureState.dy) < floorStep/2.0) {
                        if (id == existingData[i].sublanes[j].id) {
                            continue;
                        }
                        // The overlayed floor(sublane)
                        if (
                            (startPos.pan_x0 + gestureState.dx < existingData[i].sublanes[j].x && existingData[i].sublanes[j].x < startPos.pan_x0 + gestureState.dx + width1) || 
                            (startPos.pan_x0 + gestureState.dx < (existingData[i].sublanes[j].x + existingData[i].sublanes[j].width1) && (existingData[i].sublanes[j].x + existingData[i].sublanes[j].width1) < startPos.pan_x0 + gestureState.dx + width1) || 
                            (existingData[i].sublanes[j].x < (startPos.pan_x0 + gestureState.dx) && (startPos.pan_x0 + gestureState.dx + width1) < existingData[i].sublanes[j].x + existingData[i].sublanes[j].width1) || 
                            ((startPos.pan_x0 + gestureState.dx) < existingData[i].sublanes[j].x && (existingData[i].sublanes[j].x + existingData[i].sublanes[j].width1) < (startPos.pan_x0 + gestureState.dx + width1))
                        ) {
                            valid = false;
                            break;
                        }
                    }
                }
            }
            if (!valid) {
                break;
            }
        }
        if (valid) {
            pan.setValue({
                x: startPos.pan_x0 + gestureState.dx,
                y: nearestFloor(startPos.pan_y0 + gestureState.dy),
            })
        } else {
            Animated.spring(
                pan, // Auto-multiplexed
                { toValue: { x: startPos.pan_x0, y: startPos.pan_y0 } } // Back to zero
            ).start();
        }
        updateData({
            id: id,
            x: startPos.pan_x0 + gestureState.dx,
            y: nearestFloor(startPos.pan_y0 + gestureState.dy),
            width1: width1,
        });
        toggleSliding(true);
    },
  });

  return (
    <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), {width: width1, position: 'absolute'}]}
    >
        <View style={{width: width1, height: 14, marginTop: 2, borderRadius: 5, backgroundColor: color1}}>
            <View style={{width: width2, marginLeft: marginX, height: 14, borderRadius: 5, backgroundColor: color2}}>
                {/* <Text>{id}</Text> */}
            </View>
        </View>
    </Animated.View>
  );
};

export default DraggableView;