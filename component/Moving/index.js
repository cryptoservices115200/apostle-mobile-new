import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import Draggable from 'react-native-draggable';

var chart = {
    milestones: [
      {
        name: 'Milestone 1',
        due: '2019-06-21T23:04:47.280Z'
      }
    ],
    lanes: [
      {
        name: 'Preparation',
        estimatedTime: 90,
        actualTime: 94,
        start: '2019-06-21T07:04:47.280Z',
        end: '2019-06-21T10:34:47.280Z',
        startB: '2019-06-21T07:04:00.000Z',
        endB: '2019-06-21T10:30:47.280Z',
        color1: 'rgba(0, 255, 255, 0.5)',
        color2: 'rgba(0, 255, 255, 1)',
        sublanes: [{
          name: 'Cut 23g of cabbage',
          estimatedTime: 90,
          actualTime: 94,
          start: '2019-06-21T07:04:47.280Z',
          end: '2019-06-21T07:54:47.280Z',
          startB: '2019-06-21T07:04:47.280Z',
          endB: '2019-06-21T07:54:47.280Z',
          color1: 'rgba(0, 132, 250, 0.5)',
          color2: 'rgba(0, 132, 250, 1)',
        },
        {
          name: 'Slice 24 onions',
          estimatedTime: 90,
          actualTime: 94,
          start: '2019-06-21T07:54:47.280Z',
          end: '2019-06-21T10:04:47.280Z',
          startB: '2019-06-21T07:54:47.280Z',
          endB: '2019-06-21T10:00:47.280Z',
          color1: 'rgba(0, 132, 250, 0.5)',
          color2: 'rgba(0, 132, 250, 1)',
        },
        {
          name: 'Slice 24 onions',
          estimatedTime: 90,
          actualTime: 94,
          start: '2019-06-21T10:04:47.280Z',
          end: '2019-06-21T10:40:47.280Z',
          startB: '2019-06-21T10:10:47.280Z',
          endB: '2019-06-21T10:40:47.280Z',
          color1: 'rgba(0, 132, 250, 0.5)',
          color2: 'rgba(0, 132, 250, 1)',
        }]
      },
      {
        name: 'Preparation',
        estimatedTime: 90,
        actualTime: 94,
        start: '2019-06-21T10:45:47.280Z',
        end: '2019-06-21T12:20:47.280Z',
        startB: '2019-06-21T10:45:00.000Z',
        endB: '2019-06-21T12:25:47.280Z',
        color1: 'rgba(12, 9, 249, 0.5)',
        color2: 'rgba(12, 9, 249, 1)',
        sublanes: [{
          name: 'Cut 23g of cabbage',
          estimatedTime: 90,
          actualTime: 94,
          start: '2019-06-21T10:45:47.280Z',
          end: '2019-06-21T11:00:47.280Z',
          startB: '2019-06-21T10:45:47.280Z',
          endB: '2019-06-21T11:00:47.280Z',
          color1: 'rgba(0, 255, 153, 0.5)',
          color2: 'rgba(0, 255, 153, 1)',
        },
        {
          name: 'Slice 24 onions',
          estimatedTime: 90,
          actualTime: 94,
          start: '2019-06-21T11:04:47.280Z',
          end: '2019-06-21T11:34:47.280Z',
          startB: '2019-06-21T11:04:47.280Z',
          endB: '2019-06-21T11:24:47.280Z',
          color1: 'rgba(0, 255, 153, 0.5)',
          color2: 'rgba(0, 255, 153, 1)',
        }]
      }
    ]
  }
  

const sHeight = 18;
const width = Dimensions.get('window').width - 180;

const startX = 280;
const startY = 190;

const nearestY = (Y) => {
    // console.log(Y)
    let temp = (Math.round((Y) / sHeight)*sHeight)
    if (temp < sHeight) temp = sHeight
    return temp
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const DraggableGanttBar = ({ prop_x, prop_y, prop_marginX, prop_width1, prop_width2, prop_color1, prop_color2, barData, id, updateData }) => {
    const [ sPos, setSPos ] = useState({
        x: 75,
        y: 100,
        marginX: 0,
        width1: 100,
        width2: 100,
        color1: 'rgba(255,255,255, 0.5)',
        color2: 'rgba(255,255,255, 1)'
    });
    
    const forceUpdate = useForceUpdate();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setSPos({
            x: prop_x,
            y: prop_y,
            marginX: prop_marginX,
            width1: prop_width1,
            width2: prop_width2,
            color1: prop_color1,
            color2: prop_color2,
        })
    }, [])
    return (
        <Draggable 
            id = { id }
            x = { sPos.x }
            y = { sPos.y }
            renderSize = { 36 }
            touchableOpacityProps={0.7}
            // disabled = {disabled}
            // shouldReverse
            onReverse = {(e) => {
                console.log(e)
            }}
            onLongPress = {(e) => {
                setDisabled(false)
            }}
            onDragRelease = {
                ({ nativeEvent }, gestureState) => {
                    let left = (nativeEvent.pageX - startX)
                    let right = left + sPos.width1
                    let yPosI = nearestY(nativeEvent.pageY - startY)
                    console.log(nativeEvent.locationX)
                    console.log(nativeEvent.locationY)
                    let freeSpace = true
                    for (let i = 0; i < barData.length; i ++) {
                        if (barData[i].id == id) {
                            continue;
                        }
                        if (Math.abs(yPosI - barData[i].y) < 10) {
                            if ((left > barData[i].x && left < barData[i].x + barData[i].width) || (right < barData[i].x + barData[i].width && right > barData[i].x)) {
                                freeSpace = false
                                break;
                            }
                        }
                        for (let j = 0; j < barData[i].sublanes.length; j ++)
                        {
                            if (barData[i].sublanes[j].id == id) {continue}
                            if (Math.abs(yPosI - barData[i].sublanes[j].y) < 10) {
                                if ((left > barData[i].sublanes[j].x && left < barData[i].sublanes[j].x + barData[i].sublanes[j].width) || (right < barData[i].sublanes[j].x + barData[i].sublanes[j].width && right > barData[i].sublanes[j].x)) {
                                    freeSpace = false
                                    break;
                                }
                            }
                        }
                        if (!freeSpace) {
                            break;
                        }
                    }
                    if (freeSpace) {
                        updateData({
                            ...sPos,
                            id: id,
                            x: left,
                            y: yPosI,
                        })
                        // setTimeout(() => {
                            setSPos({
                                ...sPos,
                                x: left,
                                y: yPosI,
                            })
                        // }, 300)
                    } else {
                        setSPos(sPos)
                    }
                    setDisabled(true)
                }
            }
        >
            <View style={{width: sPos.width1, height: sHeight - 6, marginTop: 3, borderRadius: 1000, backgroundColor: sPos.color1}}>
                <View style={{width: sPos.width2, marginLeft: sPos.marginX, height: sHeight - 6, borderRadius: 1000, backgroundColor: sPos.color2}}>
                    {/* <Text>{sPos.x.toFixed(1)} {sPos.y.toFixed(1)}</Text> */}
                </View>
            </View>
        </Draggable>
    )
}

export default function App() {
    const [barData, setBarData] = useState([])
    useEffect(() => {
        let yPos = -1
        setBarData([...chart.lanes.map((lane, id) => {
            yPos ++;
            return ({
                id: (Math.random() * 10000).toString(),
                x: (new Date(lane.start) - new Date('2019-06-21T07:00:00.000Z')) / 10000000 / 3.6 * width * 2,
                y: (yPos) * sHeight,
                marginX: (new Date(lane.startB) - new Date(lane.start)) / 10000000 / 3.6 * width * 2,
                width1: (new Date(lane.end) - new Date(lane.start)) / 10000000 / 3.6 * width * 2,
                width2: (new Date(lane.endB) - new Date(lane.startB)) / 10000000 / 3.6 * width * 2,
                color1: lane.color1,
                color2: lane.color2,
                sublanes: lane.sublanes.map((sublane, iid) => {
                    yPos ++;
                    return ({
                        id: (Math.random() * 10000).toString(),
                        x: (new Date(sublane.start) - new Date('2019-06-21T07:00:00.000Z')) / 10000000 / 3.6 * width * 2,
                        y: (yPos) * sHeight,
                        marginX: (new Date(sublane.startB) - new Date(sublane.start)) / 10000000 / 3.6 * width * 2,
                        width1: (new Date(sublane.end) - new Date(sublane.start)) / 10000000 / 3.6 * width * 2,
                        width2: (new Date(sublane.endB) - new Date(sublane.startB)) / 10000000 / 3.6 * width * 2,
                        color1: sublane.color1,
                        color2: sublane.color2,
                    })
                })
            })
        })])
    }, [])
    return ( 
        <View 
            style={{backgroundColor: 'tranparent', flex: 1, position: 'relative'}} 
            horizontal={true}
            onScrollEndDrag={(e) => {
                console.log(e)
            }}
            onMomentumScrollEnd={(e) => {
                console.log(e)
            }}
        >
            {/* <View style={{ width: 100 }}> */}
                { barData.map((barGroup, id) => (
                    <React.Fragment key={id} >
                        <DraggableGanttBar 
                            prop_x={barGroup.x}
                            prop_y={barGroup.y}
                            prop_marginX={barGroup.marginX}
                            prop_width1={barGroup.width1}
                            prop_width2={barGroup.width2}
                            prop_color1={barGroup.color1}
                            prop_color2={barGroup.color2}
                            barData={barData}
                            updateData={(data) => setBarData((old_barData) => {
                                return old_barData.map(sBarData => {
                                    if (sBarData.id == data.id) {
                                        return ({
                                            ...sBarData,
                                            data
                                        })
                                    }
                                    return ({
                                        sBarData,
                                        sublanes: sBarData.sublanes.map(sublane => {
                                            if (sublane.id == data.id) {
                                                return ({
                                                    ...sublane,
                                                    data,
                                                })
                                            }
                                            return sublane
                                        })
                                    })
                                })
                            })}
                        />
                        { barGroup.sublanes.map((sBar, iid) => (
                            <DraggableGanttBar 
                                key={iid}
                                prop_x={sBar.x}
                                prop_y={sBar.y}
                                prop_marginX={sBar.marginX}
                                prop_width1={sBar.width1}
                                prop_width2={sBar.width2}
                                prop_color1={sBar.color1}
                                prop_color2={sBar.color2}
                                barData={barData}
                                updateData={(data) => setBarData((old_barData) => {
                                    return old_barData.map(sBarData => {
                                        if (sBarData.id == data.id) {
                                            return ({
                                                ...sBarData,
                                                data
                                            })
                                        }
                                        return ({
                                            sBarData,
                                            sublanes: sBarData.sublanes.map(sublane => {
                                                if (sublane.id == data.id) {
                                                    return ({
                                                        ...sublane,
                                                        data,
                                                    })
                                                }
                                                return sublane
                                            })
                                        })
                                    })
                                })}
                            />
                        )) }
                    </React.Fragment>
                )) }
            {/* </View> */}
        </View >
    );
}