import React from "react";
import Home from "../Screens/Home";
import Spalsh from "../Screens/Splash";
import LoginScreen from "../Screens/login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Routes = () => { 
const Stack=createNativeStackNavigator();

  return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="login" component={LoginScreen}/>
          <Stack.Screen name="splash" component={Spalsh}/>
          <Stack.Screen name="home" component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>   
  )
 }

 export default Routes;