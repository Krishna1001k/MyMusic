import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import PlayerScreen from '../Screens/Player';
import Downloads from '../Screens/Downloads';
import Favourite from '../Screens/Favourite';
import UserProfile from '../Screens/UserProfile';
import {images, Icons} from '../Utils/images';
import {colors} from '../Utils/colors';
import {normalize} from '../Utils/dimensions';
const BottomTab = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      initialRouteName="PlayerScreen"
      screenOptions={{
        headerShown: false,

        tabBarStyle: {backgroundColor: colors.tabBarBackgrnd},
        tabBarLabel: ({focused}) =>
          focused ? (
            <Image
              style={{height: 3, width: 38, borderRadius: 100}}
              source={Icons.activeLineIcon}
            />
          ) : null,
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.iconStyle}
              source={focused ? Icons.activeHomeIcon : Icons.homeIcon}
            />
          ),
        }}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.iconStyle}
              source={focused ? Icons.activeHeartIcon : Icons.heartIcon}
            />
          ),
        }}
        name="Favourite"
        component={Favourite}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.iconStyle}
              source={focused ? Icons.acitvePlayerIcon : Icons.playerIcon}
            />
          ),
        }}
        name="PlayerScreen"
        component={PlayerScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.iconStyle}
              source={focused ? Icons.activeDownloadIcon : Icons.downloadIcon}
            />
          ),
        }}
        name="Downloads"
        component={Downloads}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={styles.iconStyle}
                source={focused ? Icons.activeUserIcon : Icons.userIcon}
              />
            </View>
          ),
        }}
        name="UserProfile"
        component={UserProfile}
      />
    </BottomTab.Navigator>
  );
};
const styles = StyleSheet.create({
  iconStyle: {
    height: normalize(20),
    width: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});
export default BottomTab;
