import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = { data: { earthPornData: [], peopleDyingData: [] }}
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
    const { data } = this.state;

    console.log(data.earthPornData.length);
    console.log('=================================');
    console.log(data.peopleDyingData.length);

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;