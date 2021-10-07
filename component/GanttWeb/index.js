import React from "react";
import { View } from "react-native";
import WebView from 'react-native-webview';

const PolicyHTML = require('./build/index.html');

export default class index extends React.Component {
    render(h) {
        return (
            <View style={{width: 1000, height: 500}}>
                <WebView
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={PolicyHTML}
                    style={{height: 1000, borderStyle: 'solid', borderWidth: 2, borderColor: 'black'}}
                    injectedJavaScript={ 'if(window.myLoad)window.myLoad();true;' }
                />
            </View>
        )
    }
}