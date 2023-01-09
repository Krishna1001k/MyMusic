import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {normalize, vh, vw} from '../Utils/dimensions';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title?: string;
  colors?: any;
  imageSource?: any;
  imageStyle?: object;
  buttonStyle?: object;
  textStyle?: object;
  onPress?: any;
}
const CustomButton = (props: Props) => {
  const {
    title,
    colors,
    buttonStyle,
    textStyle,
    imageSource,
    imageStyle,
    onPress,
  } = props;
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <LinearGradient
        style={[styles?.btnView, buttonStyle]}
        colors={colors}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}>
        {imageSource && <Image style={imageStyle} source={imageSource} />}
        <Text style={[textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnView: {
    height: vh(38),
    width: vw(320),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(5),
    marginVertical: vh(20),
    flexDirection: 'row',
  },
});
export default CustomButton;
