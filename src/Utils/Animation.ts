import {Animated, NativeModules} from 'react-native';
import {normalize, SCREEN_HEIGHT, vh} from './dimensions';

const {StatusBarManager} = NativeModules;

export const _animatedScreenHeight = (animation: any) => {
  const animatedScreenHeight = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [SCREEN_HEIGHT - vh(StatusBarManager.HEIGHT), normalize(70)],
    extrapolate: 'clamp',
  });

  return animatedScreenHeight;
};

export const _animatedImageHeight = (animation: any) => {
  const animatedImageHeight = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - normalize(150)],
    outputRange: [normalize(350), normalize(40)],
    extrapolate: 'clamp',
  });

  return animatedImageHeight;
};

export const _animatedScreenPosition = (animation: any) => {
  const animatedScreenPosition = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [-SCREEN_HEIGHT + normalize(100), 0],
    extrapolate: 'clamp',
  });

  return animatedScreenPosition;
};

export const _animatedImagePosition = (animation: any) => {
  const animatedImagePosition = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - normalize(150)],
    outputRange: [0, normalize(10)],
    extrapolate: 'clamp',
  });

  return animatedImagePosition;
};

export const _animatedTrackInfoViewPosition = (animation: any) => {
  const animatedTrackInfoViewPosition = animation.y.interpolate({
    inputRange: [0, 100],
    outputRange: [normalize(100), 0],
    extrapolate: 'clamp',
  });

  return animatedTrackInfoViewPosition;
};

export const _animatedTextOpacity = (animation: any) => {
  const animatedTextOpacity = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - normalize(150)],
    outputRange: [0, normalize(1)],
    extrapolate: 'clamp',
  });

  return animatedTextOpacity;
};

export const _animatedSliderOpacity = (animation: any) => {
  const animatedSliderOpacity = animation.y.interpolate({
    inputRange: [normalize(100), normalize(400)],
    outputRange: [normalize(1), 0],
    extrapolate: 'clamp',
  });

  return animatedSliderOpacity;
};

export const _panResponderHandlerFuncton = (dy: number, animation: any) => {
  if (dy < 0) {
    Animated.timing(animation.y, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  } else if (dy > 0) {
    Animated.timing(animation.y, {
      toValue: 900,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }
};
