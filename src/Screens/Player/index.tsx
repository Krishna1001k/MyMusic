import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {normalize, vh, vw} from '../../Utils/dimensions';
import {
  initializePlayer,
  playBackStateToggling,
} from '../../Utils/PlayerFunction';
import {colors} from '../../Utils/colors';
import {Icons} from '../../Utils/images';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';
const PlayerScreen = () => {
  useEffect(() => {
    const setupPlayer = async () => {
      try {
        console.log('setupPlayer-------');
        await initializePlayer();
      } catch (err) {
        console.log(err);
      }
    };
    setupPlayer();
  }, []);

  const progress = useProgress();
  const playBackState = usePlaybackState();
  console.log('playBackState', playBackState);
  console.log('progress', progress);

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image style={styles.backBtn} source={Icons.backBtnIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Playing Now</Text>
      </View>
      <View style={styles.artwork}></View>
      <View style={styles.detailView}>
        <View style={styles.cntrlBtn}>
          <TouchableOpacity>
            <Image style={styles.nextPrev} source={Icons.prevBtn} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{height: vw(45), width: vw(45.5)}}
            onPress={playBackStateToggling}>
            <Image
              style={styles.playPause}
              source={
                playBackState !== State.Playing ? Icons.playBtn : Icons.pauseBtn
              }
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.nextPrev} source={Icons.nextBtn} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(true),
    backgroundColor: colors.primaryBackGrnd,
  },
  header: {
    // height: vh(20),
    width: vw(347),
    // alignItems: 'center',
    flexDirection: 'row',
    marginTop: normalize(10),

    // backgroundColor: 'yellow',
  },
  headerText: {
    color: colors.white,
    fontWeight: '600',
    position: 'absolute',
    left: 135,
    fontSize: normalize(16),
  },
  backBtn: {
    height: normalize(20),
    width: normalize(10),
    // backgroundColor: 'red',
  },
  artwork: {
    marginTop: normalize(10),
    height: vh(444),
    width: vw(347),
    backgroundColor: colors.white,
  },
  detailView: {
    height: normalize(194),
    width: normalize(347),
    // backgroundColor: 'grey',
  },
  cntrlBtn: {
    height: vw(60),
    width: vw(170),
    position: 'absolute',
    bottom: 0,
    left: 90,

    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playPause: {
    height: '100%',
    width: '100%',
  },
  nextPrev: {
    height: normalize(14),
    width: normalize(17),
  },
});

export default PlayerScreen;
