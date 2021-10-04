import React from 'react';
import { View, Text, Alert, Dimensions, Platform } from 'react-native';
import WebViewRpc from 'rn-webview-rpc/native';
import htmlContent from './index.html.js';

const target = {
  document: {
    body: {
      style: {
        backgroundColor: {},
      },
    },
  },
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      color: 'white', 
      html: '',
      width: 640,
      height: 960,
    };
    // console.log(`__DEV__ = ${__DEV__}`);
  }
  componentDidMount() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    this.setState({
      width: windowWidth,
      height: windowHeight,
    })
    this.setState({
      html: htmlContent({
        backgroundColor: 'white',
        width: windowWidth,
        height: windowHeight,
        bar1: {
          width1: 650,
          width2: 650,
          color1: 'rgba(0, 255, 255, 0.5)',
          color2: 'rgba(0, 255, 255, 1)',
        },
        bar2: {
          width1: 200,
          width2: 200,
          color1: 'rgba(0, 132, 250, 0.5)',
          color2: 'rgba(0, 132, 250, 1)',
        },
        bar3: {
          width1: 200,
          width2: 200,
          color1: 'rgba(0, 132, 250, 0.5)',
          color2: 'rgba(0, 132, 250, 1)',
          marginLeft1: '200',
          marginLeft2: '0',
        },
        bar4: {
          width1: 300,
          width2: 200,
          color1: 'rgba(0, 132, 250, 0.5)',
          color2: 'rgba(0, 132, 250, 1)',
          marginLeft1: '400',
          marginLeft2: '40',
        },
        bar5: {
          width1: 300,
          width2: 300,
          color1: 'rgba(12, 9, 249, 0.5)',
          color2: 'rgba(12, 9, 249, 1)',
          marginLeft1: '650',
          marginLeft2: '0',
        },
        bar6: {
          width1: 100,
          width2: 100,
          color1: 'rgba(12, 9, 249, 0.5)',
          color2: 'rgba(12, 9, 249, 1)',
          marginLeft1: '700',
          marginLeft2: '0',
        },
        bar7: {
          width1: 200,
          width2: 200,
          color1: 'rgba(12, 9, 249, 0.5)',
          color2: 'rgba(12, 9, 249, 1)',
          marginLeft1: '760',
          marginLeft2: '0',
        },
        bar8: {
          width1: 140,
          width2: 140,
          color1: 'rgba(12, 9, 249, 0.5)',
          color2: 'rgba(12, 9, 249, 1)',
          marginLeft1: '860',
          marginLeft2: '0',
        },
      })
    })
  }
  render() {
    let {
      html,
      width,
      height
    } = this.state;
    const scalesPageToFit = Platform.OS === 'android';
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 30,
        padding: 10,
        backgroundColor: 'black',
      }}
      >

        {/* WebView */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: `rgba(251,251,251,1)`,}}>
            Let's Go Har!
          </Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flexShrink: 0, display: 'flex', width: 100, height: height, display: 'none' }}>
              <View>
                <Text style={{ color: `rgba(251,251,251,1)`, borderColor: 'rgba(251,251,251,1)', paddingTop: 20, paddingBottom: 20 }}>
                  🔽Preparation
                </Text>
                <Text style={{ marginLeft: 20,color: `rgba(251,251,251,1)`, fontSize: 10 }}>Cut 23g of cabbage</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ color: `rgba(251,251,251,1)`, borderColor: 'rgba(251,251,251,1)', paddingTop: 20, paddingBottom: 20 }}>
                  🔽Preparation
                </Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ color: `rgba(251,251,251,1)`, borderColor: 'rgba(251,251,251,1)', paddingTop: 20, paddingBottom: 20 }}>
                  🔽Preparation
                </Text>
              </View>
            </View>
            <View style={{ flexShrink: 1, backgroundColor: 'yellow', width: width, height: height - 100, overflow: 'hidden' }}>
              <WebViewRpc
                source={{ html }}
                exposedObj={{ Alert }}
                scalesPageToFit={scalesPageToFit}
                onMessage={(event) => {
                  let message  = event;
                  console.log(message)
                  this.setState(message)
                }}
                injectScriptTag={false}
                javaScriptEnabled
                domStorageEnabled
                ref={(ref) => { this.webViewRpc = ref; }}
                target={target}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
