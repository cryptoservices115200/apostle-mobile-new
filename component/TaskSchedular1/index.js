import React from "react";
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

const currentTimePos = 500

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

let leftTimer = null;
let righttTimer = null;
export default class TaskSchedular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 1154,
            height: 1000,
            barData: [],
            scrollWidth: 1154,
            scrollMargin: 0,
            sliding: true,
            hPos: 0,
        }
    }
    componentDidMount () {
        let width = Dimensions.get('window').width;
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        })
      console.log(width)
        this.setState({
            scrollWidth: width - step1,
            scrollMargin: 0,
        })
        let yPos = -1
        let temp = [...chart.lanes.map((lane, id) => {
            yPos ++;
            return ({
                id: (Math.random() * 10000).toString(),
                x: (new Date(lane.start) - new Date('2019-06-21T07:00:00.000Z')) / 100000000 / 3.6 * width * 10,
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
                        x: (new Date(sublane.start) - new Date('2019-06-21T07:00:00.000Z')) / 100000000 / 3.6 * width * 10,
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
        this.setState({
            barData: temp
        })

        
    }
    render() {
        let {
            width,
            height
        } = this.state;
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
                <TimeLineBar style={{height: 20}}>
                    <BtnGroup>
                      <BarItem>
                        <MainText width={'50%'} >EST TIME</MainText>
                      </BarItem>
                      <BarItem>
                        <MainText width={'50%'} >ACTUAL TIME</MainText>
                      </BarItem>
                    </BtnGroup>
                    {/* <View style={style.dFlex}> */}
                        {['7', '7:30', '8', '8:30', '9', '9:30', '10', '10:30', '11', '11:30'].map((timePoint, id) => (
                          <BarItem width={width - 2} style={id == 9 ? {borderRightWidth: 1, borderRightColor: 'gray', borderStyle: 'solid'} : {}}>
                            <MainText style={[{fontWeight: ((width - step1) / 10 * (id + 1) > currentTimePos && ((width - step1) / 10 * (id + 1) - currentTimePos) < (width - step1) / 10) ? 'bold' : 'normal'}]} key={timePoint}>{timePoint} AM</MainText>
                          </BarItem>
                        ))}
                    {/* </View> */}
                </TimeLineBar>
                <MainBoard>
                    <LeftSidebar>
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
                        <DNDGrid width={width}>
                            <DNDGridRow width={width} height={fontSizeLg * 1.5 }>
                                {['7', '7:30', '8', '8:30', '9', '9:30', '10', '10:30', '11', '11:30'].map(timePoint => (
                                    <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 1.5 - 1}></DNDGRIDCol>
                                ))}
                            </DNDGridRow>
                            <DNDGridRow width={width} height={fontSizeLg * 4.5}>
                                {['7', '7:30', '8', '8:30', '9', '9:30', '10', '10:30', '11', '11:30'].map(timePoint => (
                                    <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 4.5 - 1}></DNDGRIDCol>
                                ))}
                            </DNDGridRow>
                            <DNDGridRow width={width} height={fontSizeLg * 1.5 +1}>
                                {['7', '7:30', '8', '8:30', '9', '9:30', '10', '10:30', '11', '11:30'].map(timePoint => (
                                    <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 1.5 - 1}></DNDGRIDCol>
                                ))}
                            </DNDGridRow>
                            <DNDGridRow width={width} height={fontSizeLg * 4.5}>
                                {['7', '7:30', '8', '8:30', '9', '9:30', '10', '10:30', '11', '11:30'].map(timePoint => (
                                    <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 4.5 - 1}></DNDGRIDCol>
                                ))}
                            </DNDGridRow>
                            <DNDGridRow width={width} height={fontSizeLg * 1.5 }>
                                {['7', '7:30', '8', '8:30', '9', '9:30', '10', '10:30', '11', '11:30'].map(timePoint => (
                                    <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 1.5 - 1}></DNDGRIDCol>
                                ))}
                            </DNDGridRow>
                            <DNDGridRow width={width} height={fontSizeLg * 9}>
                                {['7', '7:30', '8', '8:30', '9', '9:30', '10', '10:30', '11', '11:30'].map(timePoint => (
                                    <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 9 - 1}></DNDGRIDCol>
                                ))}
                            </DNDGridRow>
                            <DNDGridRow width={width} height={fontSizeLg * 1.5 }>
                                {['7', '7:30', '8', '8:30', '9', '9:30', '10', '10:30', '11', '11:30'].map(timePoint => (
                                    <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 1.5 - 1}></DNDGRIDCol>
                                ))}
                            </DNDGridRow>
                            <DNDGridRow width={width} height={fontSizeLg * 10.5 + 1}>
                                {['7', '7:30', '8', '8:30', '9', '9:30', '10', '10:30', '11', '11:30'].map(timePoint => (
                                    <DNDGRIDCol width={width} key={timePoint} height={fontSizeLg * 10.5 - 1}></DNDGRIDCol>
                                ))}
                            </DNDGridRow>

                        </DNDGrid>

                        <CurrentTimeLine left={currentTimePos}/>
                        {/* <ScrollView 
                            alwaysBounceHorizontal={false} 
                            style={{width: width - step1, paddingLeft: this.state.scrollMargin}} horizontal={true}> */}
                            <View style={{position: 'absolute', marginLeft: this.state.hPos, width: width, height: 1000, display: 'flex'}}>
                                {/* <Moving /> */}
                                { this.state.barData.map((lane, id) => {
                                    return (
                                        <React.Fragment key={lane.id}>
                                        <DraggableView
                                            id={lane.id}
                                            x={lane.x}
                                            y={lane.y}
                                            width1={lane.width1}
                                            width2={lane.width2}
                                            marginX={lane.marginX}
                                            color1={lane.color1}
                                            color2={lane.color2}
                                            existingData={this.state.barData}
                                            updateData={(data) => {
                                                if ((data.x + data.width1) > this.state.scrollWidth) {
                                                    this.setState({
                                                        scrollWidth: data.x + data.width1
                                                    });
                                                }
                                                if (data.x < (this.state.scrollMargin * -1)) {
                                                    console.log(data.x, '<', this.state.scrollMargin);
                                                    this.setState({
                                                        scrollMargin: (data.x) * -1
                                                    });
                                                }
                                                let tempBarData = this.state.barData.map(sBarData => {
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
                                                this.setState({
                                                    barData: tempBarData
                                                });
                                            }}
                                            toggleSliding={(val) => this.setState({sliding: val})}
                                        />
                                        {lane.sublanes.map((sublane, iid) => {
                                            return (
                                                <DraggableView
                                                    key={sublane.id}
                                                    id={sublane.id}
                                                    x={sublane.x}
                                                    y={sublane.y}
                                                    width1={sublane.width1}
                                                    width2={sublane.width2}
                                                    marginX={sublane.marginX}
                                                    color1={sublane.color1}
                                                    color2={sublane.color2}
                                                    existingData={this.state.barData}
                                                    updateData={(data) => {
                                                        if ((data.x + data.width1) > this.state.scrollWidth) {
                                                            this.setState({
                                                                scrollWidth: data.x + data.width1
                                                            });
                                                        }
                                                        if (data.x < (this.state.scrollMargin * -1)) {
                                                            console.log(data.x, '<', this.state.scrollMargin);
                                                            this.setState({
                                                                scrollMargin: (data.x) * -1
                                                            });
                                                        }
                                                        let tempBarData = this.state.barData.map(sBarData => {
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
                                                        this.setState({
                                                            barData: tempBarData
                                                        });
                                                    }}
                                                    toggleSliding={(val) => this.setState({sliding: val})}
                                                />
                                            )
                                        })}
                                        </React.Fragment>
                                    )
                                }) }
                            </View>
                        {/* </ScrollView> */}
                        <Btn 
                            left={40} 
                            top={350} 
                            LEFTBTN={true}
                            setHPos={(val) => 
                                this.setState((state) => ({hPos: state.hPos + val}))
                            }
                        />
                        <Btn 
                            left={width -step1 - 80} 
                            top={350} 
                            LEFTBTN={false}
                            setHPos={(val) => 
                                this.setState((state) => ({hPos: state.hPos + val}))
                            }
                        />
                        {/* <ViewBtn left={40} top={350} onPress={() => {
                            this.setState((state) => ({hPos: state.hPos + 10}))
                        }} 
                        onLongPress={() => {
                            if (!leftTimer) {
                                leftTimer = setInterval(() => {
                                    this.setState((state) => ({hPos: state.hPos + 10}))
                                }, 500);
                            }
                        }} onPressOut={() => {
                            if (leftTimer) {
                                clearInterval(leftTimer)
                            }
                        }}>
                            <Text>{'<'}</Text>
                        </ViewBtn> */}
                    </DNDBoard>
                </MainBoard>

            </MainContainer>
        )
    }
}

const MainContainer = styled.View`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: #000000;
`;

const Header = styled.View`
    height: ${fontSizeLg * 5};
    justifyContent: center;
    margin-bottom: ${70 - fontSizeLg * 5};
`;

const Title = styled.Text`
    font-size: ${fontSizeLg * 3};
    color: white;
    margin-left: 30;
`;

const HeaderButton = styled.View`
    position: absolute;
    right: 10;
    width: 200;
    height: fontSizeLg * 5;
    justify-content: center;
`;

const borderTop = css`
    border-top-color: gray;
    border-top-width: 1;
    border-style: solid;
`;

const borderLeft = css`
    border-left-color: gray;
    border-left-width: 1;
    border-style: solid;
`;
const borderRight = css`
    border-right-color: gray;
    border-right-width: 1;
    border-style: solid;
`;
const borderBottom = css`
    border-bottom-color: gray;
    border-bottom-width: 1;
    border-style: solid;
`;
const mainText = css`
    color: white;
`;

const MonthSelector = styled.View`
    font-size: ${fontSizeMd};
    color: white;
    margin-left: ${step1};
    ${borderLeft}
    ${borderTop}
    ${borderRight}
`;

const TimeLineBar = styled.View`
    display: flex;
    flex-direction: row;
    font-size: ${fontSizeSm};
    margin-left: ${step2};
    ${borderLeft}
`;

const MainBoard = styled.View`
    display: flex;
    flex-direction: row;
`;

const LeftSidebar = styled.View`
    width: ${step1}
`;

const MainItem = styled.View`
    display: flex;
    flex-direction: row;
    width: ${step1};
`;

const MainItemTitle = styled.View`
    justify-content: center;
    height: ${fontSizeLg * 1.5}; 
    width: ${step2};
    ${borderTop}
    ${borderLeft}
`;

const BtnGroup = styled.View`
    display: flex;
    flex-direction: row;
    width: ${step1 - step2};
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
    width: ${step1};
`;

const SubItemTitle = styled.View`
    justify-content: center;
    height: ${fontSizeLg*1.5}; 
    width: ${step2}; 
    padding-left: ${paddingLg}; 
    ${borderTop}
    ${borderLeft}
`;

const DNDBoard = styled.View`
    width: ${props => props.width - step1};
    overflow: hidden;
    ${borderBottom}
`;

const DNDGrid = styled.View`
    position: absolute; 
    background-color: #00000000; 
    width: ${props => props.width - step1}; 
    height: 1000;
    ${borderTop}
    ${borderRight}
`;

const DNDGridRow = styled.View`
    width: ${props => props.width - step1}; 
    height: ${(props) => props.height}; 
    display: flex;
    flexDirection: row;
    ${borderBottom}
`;

const DNDGRIDCol = styled.View`
    height: ${props => props.height}; 
    width: ${props => (props.width - step1) / 10}; 
    ${borderRight}
`;

const CurrentTimeLine = styled.View`
    position: absolute; 
    width: 3; 
    background-color: #00FF00; 
    height:2000;
    left: ${props => props.left}
`;

const MainText = styled.Text`
    font-size: ${props => props.fontSize ? props.fontSize : fontSizeMd};
    color: white;
    width: ${props => props.width ? props.width : 'auto'};
    justify-content: center;
    align-items: ${props => props.pos == 'start' ? 'flex-start' : 'center'};
    
`;

const MainBtn = styled.Text`
    color: white;
    border-radius: 5;
    padding-top: 1; 
    padding-bottom: 1; 
    padding-left: ${paddingSm}; 
    padding-right: ${paddingSm}; 
    font-size: ${fontSizeSm};
    borderRadius: 5;
    ${borderTop}
    ${borderRight}
    ${borderBottom}
    ${borderLeft}
`;

const BarItem = styled.View`
    ${borderTop}
    ${borderLeft}
    
    width: ${props => props.width ? (props.width - step1) / 10 : '50%'}; 
    justify-content: center;
    align-items: center;
`;

const ViewBtn = styled.TouchableOpacity`
    left: ${props => props.left}
    top: ${props => props.top}
    position: absolute;
    width: 40;
    height: 40;
    border-radius: 1000;
    border-width: 1;
    border-style: solid;
    border-color: gray;
`;