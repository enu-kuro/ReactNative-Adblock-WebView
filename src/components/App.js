import React, {Component} from 'react-native';
import SideMenu from 'react-native-side-menu';
import AppStore from '../stores/AppStore';
import FeedView from './FeedView';
import Menu from './Menu';
import AdblockSettings from './AdblockSettings';

import RootView from './RootView';
const {
  StyleSheet,
  NavigatorIOS,
  View
} = React;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.onChange = this.onChange.bind(this);
    AppStore.init();
  }

  componentDidMount(){
    AppStore.addChangeListener(this.onChange);
  }

  componentWillUnmount(){
    AppStore.removeChangeListener(this.onChange);
  }

  onChange(){
    this.setState({isOpen: false});
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  render(){
    return(
      <SideMenu
        menu={<Menu />}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <NavigatorIOS style={styles.container} initialRoute={{
          component: RootView,
          title: '',
          leftButtonIcon: require('image!humberger'),
          onLeftButtonPress:() => {this.toggle(); }
        }} />
      </SideMenu>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
