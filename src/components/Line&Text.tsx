import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { normalize,vh,vw } from '../Utils/dimensions'

interface Props{
    text:string,
}

const LineView=()=>{
    return(
        <View style={styles.line}>

        </View>
    )
}

const LineText = (props:Props) => {
    const {text}=props;
  return (
    <View style={styles.main}>
      <LineView />
      <Text style={styles.text}>{text}</Text>
      <LineView />
    </View>
  );
}
const styles = StyleSheet.create({
    main:{
        flexDirection:'row',
        alignItems:'center',
    },
    line:{
        height:1,
        width:vh(102),
        borderWidth:1,
        borderColor:'grey',
        marginHorizontal: vw(10),
    },
    text:{
        color:'grey',
        fontSize:normalize(12),

    }
});
export default LineText