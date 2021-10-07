import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
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
        end: '2019-06-21T09:04:47.280Z',
        startB: '2019-06-21T08:00:00.000Z',
        endB: '2019-06-21T09:04:47.280Z',
        sublanes: [{
          name: 'Cut 23g of cabbage',
          estimatedTime: 90,
          actualTime: 94,
          start: '2019-06-21T09:04:47.280Z',
          end: '2019-06-21T15:04:47.280Z',
          startB: '2019-06-21T09:04:47.280Z',
          endB: '2019-06-21T12:04:47.280Z',
        },
        {
          name: 'Slice 24 onions',
          estimatedTime: 90,
          actualTime: 94,
          start: '2019-06-21T12:04:47.280Z',
          end: '2019-06-21T18:04:47.280Z',
          startB: '2019-06-21T13:04:47.280Z',
          endB: '2019-06-21T17:04:47.280Z',
        },
        {
          name: 'Slice 24 onions',
          estimatedTime: 90,
          actualTime: 94,
          start: '2019-06-21T12:04:47.280Z',
          end: '2019-06-21T18:04:47.280Z',
          startB: '2019-06-21T13:04:47.280Z',
          endB: '2019-06-21T17:04:47.280Z',
        }]
      },
      {
        name: 'Preparation',
        estimatedTime: 90,
        actualTime: 94,
        start: '2019-06-21T07:04:47.280Z',
        end: '2019-06-21T09:04:47.280Z',
        startB: '2019-06-21T08:00:00.000Z',
        endB: '2019-06-21T09:04:47.280Z',
        sublanes: [{
          name: 'Cut 23g of cabbage',
          estimatedTime: 90,
          actualTime: 94,
          start: '2019-06-21T09:04:47.280Z',
          end: '2019-06-21T15:04:47.280Z',
          startB: '2019-06-21T09:04:47.280Z',
          endB: '2019-06-21T12:04:47.280Z',
        },
        {
          name: 'Slice 24 onions',
          estimatedTime: 90,
          actualTime: 94,
          start: '2019-06-21T12:04:47.280Z',
          end: '2019-06-21T18:04:47.280Z',
          startB: '2019-06-21T13:04:47.280Z',
          endB: '2019-06-21T17:04:47.280Z',
        }]
      }
    ]
  }
  

const sHeight = 18;
const width = Dimensions.get('window').width - 180;

const startX = 180;
const startY = 110;

const nearestY = (Y) => (Math.round(Y / sHeight))*sHeight

const DraggableGanttBar = ({ prop_x, prop_y, prop_marginX, prop_width1, prop_width2, barData, id, updateData }) => {
    const [ sPos, setSPos ] = useState({
        x: 75,
        y: 100,
        marginX: 0,
        width1: 100,
        width2: 100,
    });
    useEffect(() => {
        setSPos({
            x: prop_x,
            y: prop_y,
            marginX: prop_marginX,
            width1: prop_width1,
            width2: prop_width2,
        })
    }, [])
    return (
        <Draggable 
            id = { id }
            x = { sPos.x }
            y = { sPos.y }
            renderSize = { 5 }
            shouldReverse 
            touchableOpacityProps={0.7}
            onDragRelease = {
                ({ nativeEvent }, gestureState) => {
                    let left = (nativeEvent.pageX - startX - nativeEvent.locationX)
                    let right = left + sPos.width1
                    let freeSpace = true
                    for (let i = 0; i < barData.length; i ++) {
                        if (barData[i].id == id) {
                            continue;
                        }
                        if (Math.abs(nearestY(nativeEvent.pageY - startY - nativeEvent.locationY) - barData[i].y) < 10) {
                            if (left > barData[i].x || (nativeEvent.pageX - startX - nativeEvent.locationX + sPos.width1) < barData[i].x + barData[i].width) {
                                freeSpace = false
                                break;
                            }
                        }
                        for (let j = 0; j < barData[i].sublanes.length; j ++)
                        {
                            if (barData[i].sublanes[j].id == id) {continue}
                            if (Math.abs(nearestY(nativeEvent.pageY - startY - nativeEvent.locationY) - barData[i].sublanes[j].y) < 10) {
                                if ((nativeEvent.pageX - startX - nativeEvent.locationX) > barData[i].sublanes[j].x || (nativeEvent.pageX - startX - nativeEvent.locationX + sPos.width1) < barData[i].sublanes[j].x + barData[i].sublanes[j].width) {
                                    freeSpace = false
                                    break;
                                }
                            }
                        }
                        if (!freeSpace) {
                            break;
                        }
                    }
                    console.log(freeSpace)
                    if (freeSpace) {
                        updateData({
                            ...sPos,
                            id: id,
                            x: (nativeEvent.pageX - startX - nativeEvent.locationX),
                            y: nearestY(nativeEvent.pageY - startY - nativeEvent.locationY),
                        })
                        setSPos({
                            ...sPos,
                            x: (nativeEvent.pageX - startX - nativeEvent.locationX),
                            y: nearestY(nativeEvent.pageY - startY - nativeEvent.locationY),
                        })
                    } else {
                        setSPos(sPos)
                    }
                }
            }
        >
            <View style={{width: sPos.width1, height: sHeight - 6, marginTop: 3, borderRadius: 1000, backgroundColor: 'rgba(255,0,0,0.5)'}}>
                <View style={{width: sPos.width2, marginLeft: sPos.marginLeft, height: sHeight - 6, borderRadius: 1000, backgroundColor: 'rgba(255,0,0,1)'}}>
                    <Text>x: {sPos.x.toFixed(1)} {(sPos.x + sPos.width1).toFixed(1)}</Text>
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
                x: (new Date(lane.start) - new Date('2019-06-21T07:00:00.000Z')) / 10000000 / 3.6 * width,
                y: (yPos) * sHeight,
                marginX: (new Date(lane.startB) - new Date(lane.start)) / 10000000 / 3.6 * width,
                width1: (new Date(lane.end) - new Date(lane.start)) / 10000000 / 3.6 * width,
                width2: (new Date(lane.endB) - new Date(lane.startB)) / 10000000 / 3.6 * width,
                sublanes: lane.sublanes.map((sublane, iid) => {
                    yPos ++;
                    return ({
                        id: (Math.random() * 10000).toString(),
                        x: (new Date(sublane.start) - new Date('2019-06-21T07:00:00.000Z')) / 10000000 / 3.6 * width,
                        y: (yPos) * sHeight,
                        marginX: (new Date(sublane.startB) - new Date(sublane.start)) / 10000000 / 3.6 * width,
                        width1: (new Date(sublane.end) - new Date(sublane.start)) / 10000000 / 3.6 * width,
                        width2: (new Date(sublane.endB) - new Date(sublane.startB)) / 10000000 / 3.6 * width,
                    })
                })
            })
        })])
    }, [])
    return ( 
        <View style={{backgroundColor: 'white', flex: 1, position: 'relative'}}>
        { barData.map((barGroup, id) => (
            <React.Fragment key={id} >
                <DraggableGanttBar 
                    prop_x={barGroup.x}
                    prop_y={barGroup.y}
                    prop_marginX={barGroup.marginX}
                    prop_width1={barGroup.width1}
                    prop_width2={barGroup.width2}
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
        </View >
    );
}