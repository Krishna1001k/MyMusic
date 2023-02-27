import {View, Text} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const Favourite = () => {
  const url =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4';

  return (
    <View>
      <Text>Favourite</Text>
      <Video source={{uri: url}} />
    </View>
  );
};

export default Favourite;
