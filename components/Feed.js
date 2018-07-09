import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class Feed extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { show, data } = this.props;

    const posts = [];

    data[show].forEach((post, i) => (
      posts.push(
        <View key={i}>
          <Text>{post['data']['title']}</Text>
          <Image source={{uri: post['data']['preview']['images'][0]['source']['url']}}
            style={{width: 320, height: 239}} />
        </View>
      )
    ));

    return (
      <View style={styles.container}>
        {posts}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

export default Feed;