import React, {Component} from 'react-native';
import AdblockSettings from './AdblockSettings';
import SimpleWebView from './SimpleWebView';
import FeedView from './FeedView';
import AppStore from '../stores/AppStore';
const {
  StyleSheet,
  View
} = React;

export default class RootView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentViewName: 'FeedView'
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    AppStore.addChangeListener(this.onChange);
  }

  componentWillUnmount(){
    AppStore.removeChangeListener(this.onChange);
  }

  onChange(){
    this.setState({currentViewName: AppStore.getCurrentViewName()});
  }

  get currentView(){
    if (this.state.currentViewName === 'FeedView'){
      return <FeedView onPressRow={this.onPressRow.bind(this)} />;
    }else if (this.state.currentViewName === 'AdblockSettings'){
      return <AdblockSettings/>;
    }
    return <FeedView onPressRow={this.onPressRow.bind(this)}/>;
  }

  _openItem(item) {
    let enableAdblock = AppStore.getBoolForKey('enable_adblock', false);
    let title = enableAdblock ? item.title + '(Adblock)' : item.title;
    this.props.navigator.push({
      title: title,
      component: SimpleWebView,
      passProps: { url: item.url, adblock: enableAdblock}
    });
  }

  onPressRow(item) {
    this._openItem(item);
  }

  render(){
    return(
      <View style={styles.container}>
        {this.currentView}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
