import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Dimensions, Animated, ScrollView, SafeAreaView, PanResponder } from 'react-native';
import { css } from 'styled-components';
import styled from 'styled-components/native';

import DraggableView from '../DraggableView';
import Btn from "../Btn";

const fontSizeLg = 12;
const fontSizeMd = 9;
const fontSizeSm = 6;

const paddingLg = 25;
const paddingSm = 5;

const step1 = 280; // 1/3
const step2 = 190; // 1/5

const sHeight = 18;

const borderRight_Temp = {
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderRightColor: 'gray'
}
const borderTop_Temp = {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderTopColor: 'gray'
}
var today = new Date();
let currentTimePos = (today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds()) /3600

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

const end = 96;
let timeStep = []
for (let i = 0; i < end; i ++) {
    timeStep.push(i * 0.5)
}

export default function TaskSchedular () {
    const [width, setWidth] = useState(1154)
    const [height, setHeight] = useState(1000)
    const [barData, setBarData] = useState([])
    const [scrollWidth, setScrollWidth] = useState(1154)
    const [scrollMargin, setScrollMargin] = useState(0)
    const [sliding, setSliding] = useState(true)
    const [hPos, setHPos] = useState(0)
    useEffect(() => {
        let width1 = Dimensions.get('window').width;
        setWidth(width1)
        setHeight(Dimensions.get('window').height)
        setScrollWidth(width - step1)
        setScrollMargin(0)
        let yPos = -1
        let temp = [...chart.lanes.map((lane, id) => {
            yPos ++;
            return ({
                id: (Math.random() * 10000).toString(),
                x: (new Date(lane.start) - new Date('2019-06-21T00:00:00.000Z')) / 100000000 / 3.6 * width * 10,
                y: (yPos) * sHeight,
                marginX: (new Date(lane.startB) - new Date(lane.start)) / 100000000 / 3.6 * width * 10,
                width1: (new Date(lane.end) - new Date(lane.start)) / 100000000 / 3.6 * width * 10,
                width2: (new Date(lane.endB) - new Date(lane.startB)) / 100000000 / 3.6 * width * 10,
                color1: lane.color1,
                color2: lane.color2,
                sublanes: lane.sublanes.map((sublane, iid) => {
                    yPos ++;
                    return ({
                        id: (Math.random() * 10000).toString(),
                        x: (new Date(sublane.start) - new Date('2019-06-21T00:00:00.000Z')) / 100000000 / 3.6 * width * 10,
                        y: (yPos) * sHeight,
                        marginX: (new Date(sublane.startB) - new Date(sublane.start)) / 100000000 / 3.6 * width * 10,
                        width1: (new Date(sublane.end) - new Date(sublane.start)) / 100000000 / 3.6 * width * 10,
                        width2: (new Date(sublane.endB) - new Date(sublane.startB)) / 100000000 / 3.6 * width * 10,
                        color1: sublane.color1,
                        color2: sublane.color2,
                    })
                })
            })
        })]

        setBarData(temp)
        console.log(currentTimePos * (width - step1) / 5)
        setHPos(((currentTimePos) * (width - step1) / 5 * -1 + (width - step1) / 2))
    }, []);
    return (
        <MainContainer width={width} height={height}>
            <Header>
                <Title>Let's go Har!</Title>
            </Header>
            <HeaderButton style={{position: 'absolute', right: 10, width: 200, height: fontSizeLg * 5, justifyContent: 'center'}}>
                <MainText fontSize={fontSizeLg*2}>Task Manager</MainText>
            </HeaderButton>
            <MonthSelector>
                <MainText >AUGUST 10.2021 📆</MainText>
            </MonthSelector>
            <MainBoard>
                <LeftSidebar>
                    <MainItem style={{height: fontSizeLg * 1.5}}>
                        <MainItemTitle>
                        </MainItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainText fontSize={fontSizeMd} >EST TIME</MainText>
                            </BtnText>
                            <BtnText style={{borderRightWidth: 1, borderRightColor: 'gray', borderRightStyle: 'solid'}}>
                                <MainText fontSize={fontSizeMd} >ACTUAL TIME</MainText>
                            </BtnText>
                        </BtnGroup>
                    </MainItem>
                    <MainItem>
                        <MainItemTitle>
                          <MainText fontSize={fontSizeLg} pos={'start'}>🔽Preparation</MainText>
                        </MainItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainText fontSize={fontSizeSm}>90m</MainText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                                <MainText fontSize={fontSizeSm}>93m</MainText>
                            </BtnText>
                        </BtnGroup>
                    </MainItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Cut 23g of cabbage</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainText fontSize={fontSizeSm}>10m</MainText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                                <MainBtn>END</MainBtn>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Slice 24 onions</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainBtn>START</MainBtn>
                            </BtnText>
                            <BtnText style={borderRight_Temp}></BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Pool 8 potatoes</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainBtn>START</MainBtn>
                            </BtnText>
                            <BtnText style={borderRight_Temp}></BtnText>
                        </BtnGroup>
                    </SubItem>
                    <MainItem>
                        <MainItemTitle>
                          <MainText fontSize={fontSizeLg} pos={'start'}>🔽Cooking</MainText>
                        </MainItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}></BtnText>
                        </BtnGroup>
                    </MainItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Toast buns</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainBtn
                                >START</MainBtn>
                            </BtnText>
                            <BtnText style={borderRight_Temp}></BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Sautee ground beef</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainBtn
                                >START</MainBtn>
                            </BtnText>
                            <BtnText style={borderRight_Temp}></BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Apply onions</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainBtn
                                >START</MainBtn>
                            </BtnText>
                            <BtnText style={borderRight_Temp}/>
                        </BtnGroup>
                    </SubItem>
                    <MainItem>
                        <MainItemTitle>
                          <MainText fontSize={fontSizeLg} pos={'start'}>🔽Packaging</MainText>
                        </MainItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}></BtnText>
                        </BtnGroup>
                    </MainItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Prepare utensils</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainBtn
                                >START</MainBtn>
                            </BtnText>
                            <BtnText style={borderRight_Temp}></BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Apply Stickers</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainBtn
                                >START</MainBtn>
                            </BtnText>
                            <BtnText style={borderRight_Temp}></BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>🔽Package all burgers</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainBtn
                                >PRINT</MainBtn>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>

                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Package all burgers</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Package all burgers</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Package all burgers</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>
                    <MainItem>
                        <MainItemTitle>
                          <MainText fontSize={fontSizeLg} pos={'start'}>🔽Delievery</MainText>
                        </MainItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </MainItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>🔽John Dingers(3)</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>

                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Package all burgers</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Package all burgers</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>🔽Peter Metro</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Package all burgers</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>Package all burgers</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>
                    <SubItem style={{borderBottomWidth: 1, borderStyle: 'solid', borderBottomColor: 'gray'}}>
                        <SubItemTitle>
                            <MainText fontSize={fontSizeSm} pos={'start'}>🔽Zach Lass</MainText>
                        </SubItemTitle>
                        <BtnGroup>
                            <BtnText>
                                <MainBtn
                                >START</MainBtn>
                            </BtnText>
                            <BtnText style={borderRight_Temp}>
                            </BtnText>
                        </BtnGroup>
                    </SubItem>
                </LeftSidebar>
                <DNDBoard width={width}>
                    <DNDGrid width={width} style={{ marginLeft: hPos,}}>
                        <DNDGridRow width={width} height={ fontSizeLg * 1.5 - 1 }>
                        {/* <View style={style.dFlex}> */}
                            {timeStep.map((timePoint, id) => (
                            <BarItem
                              width={width}
                              //style={id == 23 ? {borderRightWidth: 1, borderRightColor: 'gray', borderStyle: 'solid'} : {}}
                            >
                                <MainText style={[{fontWeight: ((width - step1) / 10 * (id + 1) > currentTimePos && ((width - step1) / 10 * (id + 1) - currentTimePos) < (width - step1) / 10) ? 'bold' : 'normal'}]} key={timePoint}>
                                    {
                                        `${Math.floor(timePoint) > 12 ?
                                          (
                                            (Math.floor(timePoint)) % 12 > 0 ?
                                              (Math.floor(timePoint)) % 12 : 12
                                          ) :
                                          (Math.floor(timePoint) > 0 ? Math.floor(timePoint) : 12)
                                        }:${
                                            (timePoint - Math.floor(timePoint)) * 60 > 10 ?
                                              (timePoint - Math.floor(timePoint)) * 60 :
                                              '0' + (timePoint - Math.floor(timePoint)) * 60
                                        }`
                                    } {Math.floor(Math.floor(timePoint) / 12)%2 == 1 ? 'PM' : 'AM'}
                                </MainText>
                            </BarItem>
                            ))}
                        {/* </View> */}
                        </DNDGridRow>
                    </DNDGrid>
                    <DNDGrid width={width} style={{marginTop: fontSizeLg * 1.5, marginLeft: hPos,}}>
                        <DNDGridRow width={width} height={fontSizeLg * 1.5 }>
                            {timeStep.map(timePoint => (
                                <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 1.5 - 1}></DNDGRIDCol>
                            ))}
                        </DNDGridRow>
                        <DNDGridRow width={width} height={fontSizeLg * 4.5}>
                            {timeStep.map(timePoint => (
                                <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 4.5 - 1}></DNDGRIDCol>
                            ))}
                        </DNDGridRow>
                        <DNDGridRow width={width} height={fontSizeLg * 1.5 +1}>
                            {timeStep.map(timePoint => (
                                <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 1.5 - 1}></DNDGRIDCol>
                            ))}
                        </DNDGridRow>
                        <DNDGridRow width={width} height={fontSizeLg * 4.5}>
                            {timeStep.map(timePoint => (
                                <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 4.5 - 1}></DNDGRIDCol>
                            ))}
                        </DNDGridRow>
                        <DNDGridRow width={width} height={fontSizeLg * 1.5 }>
                            {timeStep.map(timePoint => (
                                <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 1.5 - 1}></DNDGRIDCol>
                            ))}
                        </DNDGridRow>
                        <DNDGridRow width={width} height={fontSizeLg * 9}>
                            {timeStep.map(timePoint => (
                                <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 9 - 1}></DNDGRIDCol>
                            ))}
                        </DNDGridRow>
                        <DNDGridRow width={width} height={fontSizeLg * 1.5 }>
                            {timeStep.map(timePoint => (
                                <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 1.5 - 1}></DNDGRIDCol>
                            ))}
                        </DNDGridRow>
                        <DNDGridRow width={width} height={fontSizeLg * 10.5 + 1}>
                            {timeStep.map(timePoint => (
                                <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 10.5 - 1}></DNDGRIDCol>
                            ))}
                        </DNDGridRow>

                    </DNDGrid>

                    <CurrentTimeLine left={currentTimePos * ((width - step1) / 5)} style={{ marginLeft: hPos,}}/>

                    <View style={{position: 'absolute', marginLeft: hPos, marginTop: fontSizeLg * 1.5, width: width, height: 1000, display: 'flex'}}>
                        {/* <Moving /> */}
                        { barData.map((lane, id) => {
                            return (
                                <React.Fragment key={lane.id}>
                                <DraggableView
                                    name={lane.name}
                                    id={lane.id}
                                    x={lane.x}
                                    y={lane.y}
                                    width1={lane.width1}
                                    width2={lane.width2}
                                    marginX={lane.marginX}
                                    color1={lane.color1}
                                    color2={lane.color2}
                                    existingData={barData}
                                    updateData={(data) => {
                                        if ((data.x + data.width1) > scrollWidth) {
                                          setScrollWidth(data.x + data.width1)
                                        }
                                        if (data.x < (scrollMargin * -1)) {
                                            console.log(data.x, '<', scrollMargin);
                                            setScrollMargin(data.x * -1);
                                        }
                                        let tempBarData = barData.map(sBarData => {
                                            if (sBarData.id == data.id) {
                                                return ({
                                                    ...sBarData,
                                                    x: data.x,
                                                    y: data.y
                                                })
                                            }
                                            return ({
                                                ...sBarData,
                                                sublanes: sBarData.sublanes.map(sublane => {
                                                    if (sublane.id == data.id) {
                                                        return ({
                                                            ...sublane,
                                                            x: data.x,
                                                            y: data.y
                                                        })
                                                    }
                                                    return sublane
                                                })
                                            })
                                        });
                                        setBarData(tempBarData);
                                    }}
                                    toggleSliding={(val) => setSliding(val)}
                                />
                                {lane.sublanes.map((sublane, iid) => {
                                    return (
                                        <DraggableView
                                            name={sublane.name}
                                            key={sublane.id}
                                            id={sublane.id}
                                            x={sublane.x}
                                            y={sublane.y}
                                            width1={sublane.width1}
                                            width2={sublane.width2}
                                            marginX={sublane.marginX}
                                            color1={sublane.color1}
                                            color2={sublane.color2}
                                            existingData={barData}
                                            updateData={(data) => {
                                                if ((data.x + data.width1) > scrollWidth) {
                                                    setScrollWidth(data.x + data.width1);
                                                }
                                                if (data.x < (scrollMargin * -1)) {
                                                    console.log(data.x, '<', scrollMargin);
                                                    setScrollMargin((data.x) * -1);
                                                }
                                                let tempBarData = barData.map(sBarData => {
                                                    if (sBarData.id == data.id) {
                                                        return ({
                                                            ...sBarData,
                                                            x: data.x,
                                                            y: data.y
                                                        })
                                                    }
                                                    return ({
                                                        ...sBarData,
                                                        sublanes: sBarData.sublanes.map(sublane => {
                                                            if (sublane.id == data.id) {
                                                                return ({
                                                                    ...sublane,
                                                                    x: data.x,
                                                                    y: data.y
                                                                })
                                                            }
                                                            return sublane
                                                        })
                                                    })
                                                })
                                                setBarData(tempBarData);
                                            }}
                                            toggleSliding={(val) => setSliding(val)}
                                        />
                                    )
                                })}
                                </React.Fragment>
                            )
                        }) }
                    </View>
                </DNDBoard>
                <Btn
                    left={40 + step1}
                    top={350}
                    LEFTBTN={true}
                    setHPos={(val) =>
                        setHPos((old_one) => old_one + val)
                    }
                />
                <Btn
                    left={width - 80}
                    top={350}
                    LEFTBTN={false}
                    setHPos={(val) =>
                        setHPos((old_one) => old_one + val)
                    }
                />
            </MainBoard>

        </MainContainer>
    )

}

const MainContainer = styled.View`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: #000000;
`;

const Header = styled.View`
    height: ${fontSizeLg * 5}px;
    justifyContent: center;
    margin-bottom: ${70 - fontSizeLg * 5}px;
`;

const Title = styled.Text`
    font-size: ${fontSizeLg * 3}px;
    color: white;
    margin-left: 30px;
`;

const HeaderButton = styled.View`
    position: absolute;
    right: 10px;
    width: 200px;
    height: fontSizeLg * 5px;
    justify-content: center;
`;

const borderTop = css`
    border-top-color: gray;
    border-top-width: 1px;
    border-style: solid;
`;

const borderLeft = css`
    border-left-color: gray;
    border-left-width: 1px;
    border-style: solid;
`;
const borderRight = css`
    border-right-color: gray;
    border-right-width: 1px;
    border-style: solid;
`;
const borderBottom = css`
    border-bottom-color: gray;
    border-bottom-width: 1px;
    border-style: solid;
`;
const mainText = css`
    color: white;
`;

const MonthSelector = styled.View`
    font-size: ${fontSizeMd}px;
    color: white;
    margin-left: ${step1}px;
    ${borderLeft}
    ${borderTop}
    ${borderRight}
    ${borderBottom}
`;

const TimeLineBar = styled.View`
    display: flex;
    flex-direction: row;
    font-size: ${fontSizeSm}px;
    margin-left: ${step2}px;
    ${borderLeft}
`;

const MainBoard = styled.View`
    display: flex;
    flex-direction: row;
`;

const LeftSidebar = styled.View`
    width: ${step1}px
`;

const MainItem = styled.View`
    display: flex;
    flex-direction: row;
    width: ${step1}px;
`;

const MainItemTitle = styled.View`
    justify-content: center;
    height: ${fontSizeLg * 1.5}px; 
    width: ${step2}px;
    ${borderTop}
    ${borderLeft}
`;

const BtnGroup = styled.View`
    display: flex;
    flex-direction: row;
    width: ${step1 - step2}px;
    ${borderTop}
`;

const BtnText = styled.View`
    flex-grow: 1;
    width: 50%;
    ${borderLeft}
    justify-content: center;
    align-items: center;
`;

const SubItem = styled.View`
    display: flex;
    flex-direction: row;
    width: ${step1}px;
`;

const SubItemTitle = styled.View`
    justify-content: center;
    height: ${fontSizeLg*1.5}px; 
    width: ${step2}px; 
    padding-left: ${paddingLg}px; 
    ${borderTop}
    ${borderLeft}
`;

const DNDBoard = styled.View`
    width: ${props => props.width - step1}px;
    overflow: hidden;
    ${borderBottom}
`;

const DNDGrid = styled.View`
    position: absolute; 
    background-color: #00000000; 
    width: ${props => props.width - step1}px; 
    height: 1000px;
`;

const DNDGridRow = styled.View`
    width: 10000px; 
    height: ${(props) => props.height}px; 
    display: flex;
    flexDirection: row;
    ${borderBottom}
`;

const DNDGRIDCol = styled.View`
    height: ${props => props.height}px; 
    width: ${props => Math.round((props.width - step1) / 10)}px; 
    ${borderRight}
`;

const CurrentTimeLine = styled.View`
    position: absolute; 
    width: 3px; 
    background-color: #00FF00; 
    height:2000px;
    left: ${props => props.left}px
`;

const MainText = styled.Text`
    font-size: ${props => props.fontSize ? props.fontSize : fontSizeMd}px;
    color: white;
    width: ${props => props.width ? `${props.width}px` : 'auto'};
    justify-content: center;
    align-items: ${props => props.pos == 'start' ? 'flex-start' : 'center'};
    
`;

const MainBtn = styled.Text`
    color: white;
    border-radius: 5px;
    padding-top: 1px; 
    padding-bottom: 1px; 
    padding-left: ${paddingSm}px; 
    padding-right: ${paddingSm}px; 
    font-size: ${fontSizeSm}px;
    borderRadius: 5px;
    ${borderTop}
    ${borderRight}
    ${borderBottom}
    ${borderLeft}
`;

const BarItem = styled.View`
    ${borderRight}
    
    width: ${props => Math.round((props.width - step1) / 10)}px;
    
    justify-content: center;
    align-items: center;
`;

const ViewBtn = styled.TouchableOpacity`
    left: ${props => props.left}px
    top: ${props => props.top}px
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 1000px;
    border-width: 1px;
    border-style: solid;
    border-color: gray;
`;
