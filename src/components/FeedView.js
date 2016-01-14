import React, {Component} from 'react-native';

var {
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

const items = [{title: 'Forbes', url: 'http://www.forbes.com/', description: 'Forbes'}, {title: 'Rolling Stone', url: 'http://www.rollingstone.com/', description: 'Rolling Stone'}, {title: '渋谷で働く社長のアメブロ', url: 'http://s.ameblo.jp/shibuya/', description: '渋谷で働く社長のアメブロ'}]

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

export default class FeedView extends Component {
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
            <Text style={styles.rowDetailText}>
              {item.description}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  }

  onPressRow(item) {
    this.props.onPressRow && this.props.onPressRow(item);
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
    fontSize: 17,
    fontWeight: '500',
  },
  rowDetailText: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 20,
  }
});
