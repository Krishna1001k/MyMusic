import {StyleSheet,NativeModules, Platform} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { normalize,vh,vw } from './dimensions';
const statusBarHeight= Platform.OS == 'ios' ? NativeModules.StatusBarManager.HEIGHT : 0
// const statusBarHeight=getStatusBarHeight();


const commonStyles = StyleSheet.create({
   mainView:{
       flex:1,
    paddingTop: (statusBarHeight) ,
}
})

export default commonStyles;