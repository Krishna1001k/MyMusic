import {StyleSheet} from 'react-native'
import { channel } from 'redux-saga'
import { DESIGN_HEIGHT, normalize,SCREEN_HEIGHT,vh,vw } from '../../Utils/dimensions'
const spalshStyles = StyleSheet.create({
    musicImage:{
        height:vh(168),
        width:vw(168),
        alignSelf:'center',
        marginTop:vh(SCREEN_HEIGHT/2-168)
    },
    text1:{
        marginTop:vh(15),
        letterSpacing:1,
        marginHorizontal:vw(30),
        fontSize:normalize(27),
        fontWeight:'700',
        color:'#FFFFFF',
        textAlign:'center'
,    },
    text2:{
        marginTop:vh(10),
        fontSize:normalize(24),
        fontWeight:'600',
        color:'#08979C',
        textAlign:'center'

    }
})

export default spalshStyles;