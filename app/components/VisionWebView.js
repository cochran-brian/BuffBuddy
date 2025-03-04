import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {useState, useEffect} from "react";
import WebView from "react-native-webview";

// Our API request your token provided on our dashboard on www.posetracker.com (It's free <3)
const API_KEY =  "e9b5bed4-b7d4-4dbc-8ba1-f14f2fda7bcc"
const POSETRACKER_API = "https://www.posetracker.com/pose_tracker/tracking"

export default function VisionWebView({ exercise, difficulty, setIsReady, setRepsCounter, setCurrentPoseTrackerInfos }) {
  
  // Our API request the width and height wanted for display the webcam inside the webview
  // const width = Dimensions.get('screen').width;
  // const height = width;

  const width = 600;
  const height = 600;
  
  // You can request API to display user skeleton or not (by default it's set to true)
  const skeleton = true
  
  const posetracker_url = `${POSETRACKER_API}?token=${API_KEY}&exercise=${exercise}&difficulty=${difficulty}&width=${width}&height=${height}&skeleton=${skeleton}`
  
  // We need a bridge to transit data between the ReactNative app and our WebView
  // The WebView will use this function define here to send info that we will use later
  const jsBridge = `
  (function() {
    window.webViewCallback = function(info) {
      window.ReactNativeWebView.postMessage(JSON.stringify(info));
    }
  })();
`
  
  const handleCounter = (count) => {
    setRepsCounter(count)
  }
  
  const handleInfos = (infos) => {
    setCurrentPoseTrackerInfos(infos)
    console.log(infos)
  }
  
  //This is the function pass to the WebView to listen info from the WebView
  const webViewCallback = (info) => {
    switch (info.type) {
      case 'counter':
        return handleCounter(info.current_count)
      default:
        return handleInfos(info)
    }
  }
  
  return (
  
    <View style={styles.container}> 
        <View style={{flex: 1}}>
        <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        style={{
          width: width,
          height: height,
          zIndex: 1
        }}
        source={{ uri: posetracker_url }}
        originWhitelist={['*']}
        injectedJavaScript={jsBridge}
        onMessage={(event) => {
          const info = JSON.parse(event.nativeEvent.data)
          webViewCallback(info)
        }}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // marginTop: 200,
  },
});