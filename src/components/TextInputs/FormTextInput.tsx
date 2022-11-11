import { View, Text,TextInput,StyleSheet, TextInputProps } from 'react-native'
import React from 'react'
import { normalize, SCREEN_WIDTH, vh,vw } from '../../Utils/dimensions';
import { colors } from '../../Utils/colors';

interface Props{
  placholder:string,
    onChangeText:any,
    title:string,
    secureText:boolean,
}

/**
 * 
 * @param param0 
 * @returns 
 */

const FormTextInput = (props:Props) => {
  const {
    placholder,
    onChangeText,
    title,
    secureText,
}=props
  return (
    <View style={styles.viewStyle}>
        <Text style={styles.titleText}>{title}</Text>
      <TextInput secureTextEntry={secureText}  style={styles.textInputStyle} placeholder={placholder} onChangeText={onChangeText}/>
    </View>
  )
}

const styles = StyleSheet.create({
    viewStyle:{
        height:vh(63),
        width:vw(320),
    marginVertical:vh(10),
    },
    titleText:{
        color:'white',
        fontSize:14,
        marginBottom:vh(7),
        fontWeight:'500',
    },
    textInputStyle:{
        width:'100%',
        padding:vh(10),
        backgroundColor:'white',
        borderRadius:normalize(5),
        fontSize:normalize(16)
    }
});

export default FormTextInput