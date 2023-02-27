import {View, Text, Image, Platform} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import commonStyles from '../../Utils/commonStyles';
import {images} from '../../Utils/images';
import spalshStyles from './style';
import {colors} from '../../Utils/colors';
import {useNavigation} from '@react-navigation/native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Spalsh = () => {
  const navigation = useNavigation();
  useEffect(() => {
    RequestPermission();
    setTimeout(() => {
      navigation.replace('BottomTab');
    }, 1500);
  }, []);

  const RequestPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.MEDIA_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      console.log('Permission Result-->', result);
    } catch (error) {
      console.log('Permission Error===', error);
    }
  };

  return (
    <LinearGradient
      style={commonStyles.mainView}
      start={{x: 0.5, y: 0}}
      end={{x: 1.2, y: 0.6}}
      colors={colors.primaryGradient}>
      <Image style={spalshStyles.musicImage} source={images.musicIcon} />
      <Text style={spalshStyles.text1}>
        Start Turing Your ideas into Reality
      </Text>
      <Text style={spalshStyles.text2}>Listen to My Music</Text>
    </LinearGradient>
  );
};

export default Spalsh;
function alert(arg0: string, err: unknown) {
  throw new Error('Function not implemented.');
}
