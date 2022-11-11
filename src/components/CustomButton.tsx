import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {normalize, vh, vw} from '../Utils/dimensions';
import {colors} from '../Utils/colors';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    title:string,
}
const CustomButton = (props:Props) => {
    const {title}=props
  return (
    <TouchableOpacity activeOpacity={0.6}>
      <LinearGradient style={styles.btnView} colors={colors.primaryGradient}
      start={{x:0,y:1}}
      end={{x:1,y:1}}
      >
        <Text style={styles.titleText} >{title}</Text>
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
    marginVertical:vh(20),
  },
  titleText:{
      color:colors.white,
      fontWeight:'600',
  }
});
export default CustomButton;
