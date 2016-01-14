import React, {Component} from 'react-native';
import AppStore from '../stores/AppStore';
import SettingItem from './SettingItem';

var {
  ListView,
  PixelRatio,
  StyleSheet,
  View
} = React;

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

const items = [{id:'Adblock', title: 'Adblock'}];

export default class AdblockSettings extends Component {
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
        <SettingItem item={item} />
        <View style={styles.separator} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: 64
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  separator: {
    height: 2 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
  }
});
