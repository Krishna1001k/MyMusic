import {
  View,
  Text,
  FlatList,
  NativeModules,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import TrackPlayer from 'react-native-track-player';
import {initializePlayer} from '../../Utils/PlayerFunction';
import {colors} from '../../Utils/colors';
import SearchInput from '../../components/TextInputs/SearchInput';
import {useDispatch, useSelector} from 'react-redux';
import {addData, setLoading} from '../../Redux/Home/reducer';
import {normalize, vh} from '../../Utils/dimensions';

const Home = () => {
  const {MusicMetadataModule} = NativeModules;
  const dispatch = useDispatch();
  const store = useSelector((state: any) => state.home);
  console.log('store', store);
  useEffect(() => {
    dispatch(setLoading(true));
    MusicMetadataModule.getAudioFiles()
      .then((metaData: any) => {
        dispatch(addData(metaData));
        dispatch(setLoading(false));
        initializePlayer(metaData);
      })
      .catch((err: any) => console.log(err));
  }, []);

  const renderAudioFile = ({item}: any) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.artist}</Text>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: `data:image/png;base64,${item?.artwork}`}}
        />
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Text style={styles.userNameText}>Hello User</Text>
      <Text style={styles.constText}>What You want to hear today ?</Text>
      <SearchInput />
      {/* <FlatList
        data={audioFiles}
        renderItem={renderAudioFile}
        keyExtractor={(item: any, index: any) => index.toString()}
      /> */}
      {store.loading && (
        <ActivityIndicator
          size={'large'}
          color={colors.primaryLightGreen}
          style={styles.loader}
        />
      )}
      <Text onPress={() => TrackPlayer.play()}>Play</Text>
      <Text onPress={() => TrackPlayer.pause()}>Puase</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.primaryBackGrnd,
    paddingTop: vh(5),
  },
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  userNameText: {
    color: colors.white,
    fontSize: normalize(16),
    fontWeight: '600',
  },
  constText: {
    color: colors.white,
    fontSize: normalize(14),
    fontWeight: '400',
  },
});

export default Home;
