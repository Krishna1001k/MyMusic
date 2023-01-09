import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import {images} from '../../Utils/images';
import {colors} from '../../Utils/colors';
import loginStyles from './styles';
import FormTextInput from '../../components/TextInputs/FormTextInput';
import CustomButton from '../../components/CustomButton';
import LineText from '../../components/Line&Text';
import BottomText from '../../components/BottomText';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
const LoginScreen = () => {
  GoogleSignin.configure({
    webClientId:
      '579994533391-4lskmvftuaqs3d16vg0n8r1hfqkavlcq.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

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

      <CustomButton
        title={'Sign In'}
        textStyle={loginStyles.signBtnText}
        colors={colors.primaryGradient}
      />

      <LineText text={'Or continue with'} />

      <CustomButton
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
        imageSource={images.googleIcon}
        imageStyle={loginStyles.googleIcon}
        buttonStyle={loginStyles.googleBtn}
        title={'Sign In With Google'}
        textStyle={loginStyles.googleText}
        colors={['white', 'white']}
      />
      <BottomText />
      <ImageBackground
        style={loginStyles.backGrndImage}
        source={images.backGround}
      />
    </View>
  );
};

export default LoginScreen;
