import {
  vh,
  vw,
  normalize,
  DESIGN_WIDTH,
  SCREEN_WIDTH,
} from '../../Utils/dimensions';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Animated,
} from 'react-native';
import TrackPlayer, {
  State,
  useProgress,
  usePlaybackState,
} from 'react-native-track-player';
import {
  NextTrack,
  PreviousTrack,
  initializePlayer,
  playBackStateToggling,
  getCurrentTrackIndex,
  getCurrentTrack,
  secondsToHHMMSS,
  seekToTrack,
} from '../../Utils/PlayerFunction';
import {colors} from '../../Utils/colors';
import {tracks} from '../../Utils/tracks';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {Icons, images} from '../../Utils/images';
import Slider from '@react-native-community/slider';
import RenderSongList from '../../components/renderSongList';

const PlayerScreen = () => {
  const progress = useProgress();
  const flatlistRef = useRef(null);
  const playBackState = usePlaybackState();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentTrack, setCurrentTrack] = useState(null);
  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await initializePlayer();
        await setTrack();
      } catch (err) {
        console.log(err);
      }
    };
    setupPlayer();
  }, []);

  const setTrack = async () => {
    console.log('setTrack');
    await getCurrentTrackIndex((index: number) => {
      getCurrentTrack(setCurrentTrack, index);
      flatlistRef.current.scrollToIndex(index);
    });
  };

  const onPressNextTrack = () => {
    NextTrack(setTrack);
  };
  const onPressPrevTrack = () => {
    PreviousTrack(setTrack);
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <TouchableOpacity>
          <Image style={styles.backBtn} source={Icons.backBtnIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Playing Now</Text>
      </View>

      <RenderSongList
        songLists={tracks}
        callBack={setCurrentTrack}
        ref={flatlistRef}
      />

      {/* <View style={styles.detailView}> */}
      <View style={{paddingHorizontal: vw(16)}}>
        <Text
          style={{
            color: colors.white,
            fontSize: normalize(22),
          }}>
          {currentTrack?.title}
        </Text>
        <Text
          style={{
            color: colors.white,
            fontSize: normalize(14),
          }}>{`${currentTrack?.album ? currentTrack?.album : 'Unknown'} - ${
          currentTrack?.artist ? currentTrack.artist : 'Unknown'
        }`}</Text>

        <Slider
          step={1}
          tapToSeek
          minimumValue={0}
          value={progress.position}
          maximumTrackTintColor="#8E8E8E"
          onSlidingComplete={TrackPlayer.seekTo}
          maximumValue={progress.duration}
          thumbImage={Icons.sliderThumbImage}
          minimumTrackTintColor={colors.primaryAqua}
          style={{width: DESIGN_WIDTH, height: vh(50)}}
        />
        <View style={styles.timerContainer}>
          <Text style={styles.timeText}>
            {secondsToHHMMSS(progress.position)}
          </Text>
          <Text style={styles.timeText}>
            {secondsToHHMMSS(progress.duration)}
          </Text>
        </View>
        {/* </View> */}

        <View style={styles.cntrlBtn}>
          <TouchableOpacity activeOpacity={0.7} onPress={onPressPrevTrack}>
            <Image style={styles.nextPrev} source={Icons.prevBtn} />
          </TouchableOpacity>
          {playBackState === State.Connecting ? (
            <ActivityIndicator
              color={colors.primaryAqua}
              size={'large'}
              style={styles.playButtonIconStyle}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.playButtonIconStyle}
              onPress={playBackStateToggling}>
              <Image
                style={styles.playPause}
                source={
                  playBackState !== State.Playing
                    ? Icons.playBtn
                    : Icons.pauseBtn
                }
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity activeOpacity={0.7} onPress={onPressNextTrack}>
            <Image style={styles.nextPrev} source={Icons.nextBtn} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.primaryBackGrnd,
  },
  header: {
    width: DESIGN_WIDTH,
    // backgroundColor: 'red',
    alignItems: 'center',
    alignSelf: 'center',
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
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.white,
  },

  cntrlBtn: {
    height: vw(60),
    width: vw(170),
    marginBottom: vh(10),
    alignSelf: 'center',
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
  playButtonIconStyle: {height: vw(45), width: vw(45.5)},
});

export default PlayerScreen;
