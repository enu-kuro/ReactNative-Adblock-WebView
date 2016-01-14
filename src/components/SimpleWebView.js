import React, {Component} from 'react-native';
import {AdblockManager} from 'NativeModules';
const {
  StyleSheet,
  View,
  WebView
} = React;

export default class SimpleWebView extends Component{

  componentWillMount(){
    if (this.props.adblock){
      AdblockManager.setAdblock((result) => {
        console.log(result);
      });
    }
  }

  componentWillUnmount() {
    if (this.props.adblock){
      AdblockManager.unsetAdblock((result) => {
        console.log(result);
      });
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <WebView url={this.props.url} startInLoadingState={true}/>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
