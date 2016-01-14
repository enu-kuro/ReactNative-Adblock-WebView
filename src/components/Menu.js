import React, {Component} from 'react-native';
import ActionCreators from '../actions/ActionCreators';
import Dimensions from 'Dimensions';

var {
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

const window = Dimensions.get('window');

const items = [{title: 'Site List', viewName: 'App'}, {title: 'Adblock Settings', viewName: 'AdblockSettings'}]

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: ds.cloneWithRows(items)
    });
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          keyboardShouldPersistTaps={true}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
        />
      </View>
    );
  }

  renderRow(item, i) {
    return (
      <View key={i}>
        <TouchableHighlight onPress={() => this.onPressRow(item)}>
          <View style={styles.row}>
            <Text style={styles.rowTitleText}>
              {item.title}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  }

  onPressRow(item) {
    ActionCreators.transitionTo(item.viewName);
  }
}

var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: window.width,
    height: window.height,
    paddingTop: 64
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  separator: {
    height: 2 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
  },
  rowTitleText: {
    fontSize: 20,
    fontWeight: '500',
  }
});
