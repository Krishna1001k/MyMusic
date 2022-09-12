import { View, Text,TextInput,StyleSheet } from 'react-native'
import React from 'react'
import { normalize, SCREEN_WIDTH, vh,vw } from '../../Utils/dimensions';
import { colors } from '../../Utils/colors';

const FormTextInput = ({
    placholder,
    onChangeText,
    title,
    secureText,
}:any) => {
  return (
    <View style={styles.viewStyle}>
        <Text style={styles.titleStyle}>{title}</Text>
      <TextInput secureTextEntry={secureText}  style={styles.textInputStyle} placeholder={placholder} onChangeText={onChangeText}/>
    </View>
  )
}

const styles = StyleSheet.create({
    viewStyle:{
        height:vh(80),
        width:vw(350),
        justifyContent:'space-between',
    },
    titleStyle:{
        color:'white',
        fontSize:16,
        fontWeight:'500',
    },
    textInputStyle:{
        height:vh(50),
        width:'100%',
        paddingHorizontal:10,
        backgroundColor:'white',
        borderRadius:normalize(5),
        fontSize:normalize(17)
    }
});

export default FormTextInput