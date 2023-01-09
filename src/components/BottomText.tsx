import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../Utils/colors';
import { normalize } from '../Utils/dimensions';

export default function BottomText() {
  return (
    <View style={styles.main}>
      <Text style={styles.inactiveText}>
        Already have an account?</Text>
      <TouchableOpacity activeOpacity={0.7}>
      <Text style={styles.activeText}> Sign in</Text>
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({
  main:{
    flexDirection:'row',
  },
    inactiveText:{
        color:colors.white,
        fontSize:normalize(16),
    },
    activeText:{
        color:colors.primaryLightGreen,
        fontSize:normalize(16),
    }

});