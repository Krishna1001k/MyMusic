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
  SeekTo,
} from '../../Utils/PlayerFunction';
import {colors} from '../../Utils/colors';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {Icons, images} from '../../Utils/images';
import {Slider} from '@miblanchard/react-native-slider';

import RenderSongList from '../../components/renderSongList';
import {useSelector} from 'react-redux';

const PlayerScreen = () => {
  const tracks = useSelector((state: any) => state.home.data);
  const progress = useProgress();
  const flatlistRef = useRef(null);
  const playBackState = usePlaybackState();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentTrack, setCurrentTrack] = useState(null);
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const trackSubscription = TrackPlayer.addEventListener(
      'playback-track-changed',
      async data => {
        console.log('playback-track-changed', data);
        setTrack();
      },
    );

    return () => {
      trackSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const setupPlayer = async () => {
      try {
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

      <Text
        style={{
          color: colors.white,
          fontSize: normalize(22),
          marginLeft: vw(16),
        }}>
        {currentTrack?.title.replace(/\s*\([^)]*\)/, '')}
      </Text>
      <Text
        style={{
          color: colors.white,
          fontSize: normalize(14),
          marginLeft: vw(16),
        }}>{`${
        currentTrack?.album
          ? currentTrack?.album.replace(/\s*\([^)]*\)/, '')
          : 'Unknown'
      } - ${
        currentTrack?.artist
          ? currentTrack.artist.replace(/\s*\([^)]*\)/, '')
          : 'Unknown'
      }`}</Text>

      <Slider
        trackClickable
        minimumValue={0}
        animateTransitions
        value={progress.position}
        maximumTrackTintColor="#8E8E8E"
        onSlidingComplete={value => {
          // why is this an array?
          value = Array.isArray(value) ? value[0] : value;
          TrackPlayer.seekTo(value);
        }}
        maximumValue={progress.duration}
        thumbTintColor={colors.primaryAqua}
        thumbStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          height: normalize(10),
          width: normalize(10),
          borderRadius: normalize(5),
          borderWidth: normalize(1.4),
          borderColor: colors.white,
          // overflow: 'hidden',
        }}
        minimumTrackTintColor={colors.primaryAqua}
        containerStyle={{
          width: vw(384),
          height: vh(9),
          marginTop: vh(29),
          alignSelf: 'center',
        }}
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
        <TouchableOpacity
          hitSlop={{top: 10, bottom: 10, left: 25, right: 20}}
          activeOpacity={0.7}
          onPress={onPressPrevTrack}>
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
                playBackState !== State.Playing ? Icons.playBtn : Icons.pauseBtn
              }
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressNextTrack}
          hitSlop={{top: 10, bottom: 10, left: 25, right: 20}}>
          <Image style={styles.nextPrev} source={Icons.nextBtn} />
        </TouchableOpacity>
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
    width: vw(387),
    height: vh(19),
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: normalize(10),
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
    marginTop: vh(10),
    width: vw(385),
    alignSelf: 'center',
    // marginHorizontal: vw(20),
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
