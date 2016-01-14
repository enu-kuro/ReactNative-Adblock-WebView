import React, {Component} from 'react-native';
import AppStore from '../stores/AppStore';
import ActionCreators from '../actions/ActionCreators';

var {
  View,
  Text,
  StyleSheet,
  Switch
} = React;

export default class SettingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchState: AppStore.getBoolForKey('enable_adblock', false)
    };
  }

  toggle() {
    this.setState({
      switchState: !this.state.switchState,
    });
    ActionCreators.enableAdblock(this.state.switchState);
  }

  render(){
    return(
      <View style={styles.row}>
        <Text style={styles.rowTitle}>
          {this.props.item.title}
        </Text>
        <Switch value={this.state.switchState} onValueChange={() => this.toggle()}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  }
});
