import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

import Feed from './components/Feed';

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      feed: null,
      data: { earthPornData: [], peopleDyingData: [] },
    }
  }

  componentDidMount() {
    const earthPornData = fetch('https://www.reddit.com/r/earthporn.json')
      .then((response) => response.json())
      .then((responseJson) => responseJson.data.children.splice(0, 10))
      .catch((error) => {
        console.error(error);
      });

    const peopleDyingData = fetch('https://www.reddit.com/r/peopleFuckingDying.json')
      .then((response) => response.json())
      .then((responseJson) => responseJson.data.children.splice(0, 10))
      .catch((error) => {
        console.error(error);
      });

    Promise.all([earthPornData, peopleDyingData])
      .then(([earthPornData, peopleDyingData]) => this.setState({
        data: {
          earthPornData,
          peopleDyingData,
        }
      }));
  }

  render() {
    const { feed, data } = this.state;

    console.log(data.earthPornData.length);
    console.log('=================================');
    console.log(data.peopleDyingData.length);

    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => {
                this.setState({ feed: 'peopleDyingData' });
              }}
              title="People Fucking Dying"
              color="#841584"
              accessibilityLabel="See people fucking dying" />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => {
                this.setState({ feed: 'earthPornData' });
              }}
              title="Earth Porn"
              color="#841584"
              accessibilityLabel="See some earth porn" />
          </View>
        </View>
        {feed !== null && <Feed show={feed} data={data} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    padding: 10,
  },
});

export default App;