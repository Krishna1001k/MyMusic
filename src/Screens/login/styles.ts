import {
  SCREEN_HEIGHT,
  normalize,
  vh,
  vw,
  SCREEN_WIDTH,
} from './../../Utils/dimensions';
import {StyleSheet} from 'react-native';
import {colors} from '../../Utils/colors';
import commonStyles from '../../Utils/commonStyles';
const loginStyles = StyleSheet.create({
  main: {
    backgroundColor: colors.primaryBackGrnd,
    flex: 1,
    alignItems:'center',
  },
  backGrndImage: {
    height: vh(SCREEN_HEIGHT),
    width: vw(SCREEN_WIDTH + 100),
    opacity: 0.4,
    position: 'absolute',
    zIndex: -10,
  },

  musicIcon: {
      height: vw(74),
        width: vw(74),
        alignSelf:'center',
        marginTop:vh(100),
    },
    greenTitleText:{
      marginTop:vh(18),
      color:colors.titleGreen,
      fontSize:normalize(24),
      fontWeight:'600',
    },
    whiteTitleText:{
      marginTop:vh(20),
      color:colors.white,
      fontSize:normalize(30),
      fontWeight:'800',
    },
    inputView:{
      marginTop: vh(20),   
    }
});

export default loginStyles;
