import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import commonStyles from '../../Utils/commonStyles';
import {images} from '../../Utils/images';
import {colors} from '../../Utils/colors';
import loginStyles from './styles';
import FormTextInput from '../../components/TextInputs/FormTextInput';
import CustomButton from '../../components/CustomButton';
import LineText from '../../components/Line&Text';
// import { GoogleSignin, GoogleSigninButton, } from '@react-native-google-signin/google-signin';


const LoginScreen = () => {
  return (
    <View style={loginStyles.main}>

      <Image source={images.musicIconFull} style={loginStyles.musicIcon} />
      <Text style={loginStyles.greenTitleText}>Welcome to My Music</Text>
      <Text style={loginStyles.whiteTitleText}>Create your account</Text>

    <View style={loginStyles.inputView}> 
      <FormTextInput
        placholder={'Full Name'}
        onChangeText={(txt: string) => {
          console.log(txt);
        }}
        title={'Name'}
        secureText={false}
      />
      <FormTextInput
        placholder={'Email'}
        onChangeText={(txt: string) => {
          console.log(txt);
        }}
        title={'Email'}
        secureText={false}
      />
      <FormTextInput
        placholder={'Password'}
        onChangeText={(txt: string) => {
          console.log(txt);
        }}
        title={'Password'}
        secureText={true}
      />
</View> 

<CustomButton title={'Sign In'}/>
<LineText text={'Or continue with'}/>
{/* <GoogleSigninButton/> */}
      <ImageBackground
        style={loginStyles.backGrndImage}
        source={images.backGround}
      />
    </View>
  );
};

export default LoginScreen;
