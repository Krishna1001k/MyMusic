import React, {
  forwardRef,
  useCallback,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import {StyleSheet, Animated, View, Image, FlatList} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  normalize,
  SCREEN_WIDTH,
  vh,
  vw,
} from '../Utils/dimensions';
// import { FlatList } from 'react-native-gesture-handler';
import {
  SkipTo,
  PlayTrack,
  NextTrack,
  PauseTrack,
  PreviousTrack,
  getCurrentTrack,
  getCurrentTrackIndex,
} from '../Utils/PlayerFunction';

// const CheckTrackIndex = async (viewableIndex: number) => {
//   const currentTrackIndex = await TrackPlayer.getCurrentTrack();
//   console.log(currentTrackIndex, viewableIndex);

//   if (viewableIndex > currentTrackIndex) NextTrack();
//   else if (viewableIndex < currentTrackIndex) PerviousTrack();
// };

const RenderSongList = forwardRef((props: any, ref) => {
  const {songLists, callBack} = props;
  const listRef = useRef(null);

  const onViewableItemsChanged = ({viewableItems, changed}: any) => {
    if (changed[0].isViewable) {
      const viewableIndex = viewableItems[0].index;
      console.log('viewableIndex--', viewableIndex);
      //  CheckTrackIndex(viewableIndex)
      SkipTo(viewableItems[0].index, () => {
        getCurrentTrack(callBack, viewableIndex);
      });
    }
  };

  const viewabilityConfig = {
    waitForInteraction: true,
    minimumViewTime: 600,
    itemVisiblePercentThreshold: 85,
  };

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  useImperativeHandle(ref, () => {
    return {
      scrollToIndex: (index: number) => {
        listRef.current.scrollToIndex({
          index: index,
          viewPostion: 0.5,
          animated: true,
        });
      },
    };
  });

  const renderSongsDetails = ({item}: any) => {
    return (
      <View style={styles.renderViewWrapper}>
        <View style={styles.artworkWrapper}>
          <Image
            style={styles.artwork}
            // resizeMode={'stretch'}
            source={
              typeof item.artwork === 'string' && item.artwork.includes('http')
                ? {uri: `${item?.artwork}`}
                : {uri: `${item?.artwork?.uri}`}
            }
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={songLists}
      ref={listRef}
      horizontal={true}
      pagingEnabled
      bounces={false}
      scrollEventThrottle={16}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={renderSongsDetails}
      // style={{
      //   backgroundColor: 'grey',
      //   marginHorizontal: vw(16),
      //   width: DESIGN_WIDTH,
      //   marginTop: vh(29),
      //   borderRadius: normalize(9),
      // }}

      // contentContainerStyle={{backgroundColor: 'green'}}
      showsHorizontalScrollIndicator={false}
    />
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    // height: '100%',
    // width: '100%',

    backgroundColor: 'green',
    // zIndex: 2,
  },
  container: {
    // alignItems: 'center',
    backgroundColor: 'orange',
    // width: '100%',
    // height: '100%',
    // marginRight: 15,
  },
  renderViewWrapper: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artworkWrapper: {
    height: vh(444),
    width: DESIGN_WIDTH,
  },
  artwork: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: normalize(10),
    backgroundColor: 'lightgrey',
  },
});

export default React.memo(RenderSongList);
