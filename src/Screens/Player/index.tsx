import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {normalize} from '../../Utils/dimensions';
import {initializePlayer} from '../../Utils/PlayerFunction';

const PlayerScreen = () => {
  console.log('----<STATus HEIGHT>>>>', getStatusBarHeight());

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await initializePlayer();
      } catch (err) {
        console.log(err);
      }
      setupPlayer();
    };
  }, []);

  return (
    <View style={styles.main}>
      <Text>PlayerScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
});

export default PlayerScreen;
