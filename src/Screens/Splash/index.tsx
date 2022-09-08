import { View, Text,Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import commonStyles from '../../Utils/commonStyles'
import { images } from '../../Utils/images'
import spalshStyles from './style'
import { colors } from '../../Utils/colors'
const Spalsh = () => {
  return (
    <LinearGradient
    style={commonStyles.mainView}
    start={{x: 0.5, y: 0}}
    end={{x: 1.2, y: 0.6}}
    colors={colors.primaryGradient}>
    <Image style={spalshStyles.musicImage} source={images.musicIcon} />
    <Text  style={spalshStyles.text1}>Start Turing Your ideas into Reality</Text>
    <Text  style={spalshStyles.text2}>Listen to My Music</Text>
  </LinearGradient>
  )
}

export default Spalsh