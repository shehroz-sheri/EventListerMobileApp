import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { useRootNavigator } from "./useRootNavigator";
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreenComponent,
  ResetPasswordScreen,
  TicketDetailScreen,
  MainTabsScreen,
  EditEventScreen,
  EventDetailsScreen,
} from "./routes";
import SplashScreen from "../screens/splashScreen/SplashScreen";
import { colors } from "../constants/colors";
import { BackButton } from "./components/backButton/BackButton";
import { styles } from "./RootNavigatorStyles";

const Stack = createStackNavigator();

function RootNavigator() {
  useRootNavigator();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreenComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={({ navigation }) => ({
            title: "Reset Password",
            headerStyle: styles.headerStyle,
            headerTitleAlign: "center",
            headerTitleStyle: styles.headerTitleStyle,
            headerShadowVisible: false,
            headerLeft: () => <BackButton navigation={navigation} />,
            animationEnabled: true,
          })}
        />
        <Stack.Screen
          name="TicketDetail"
          component={TicketDetailScreen}
          options={({ navigation }) => ({
            title: "Detail Ticket",
            headerStyle: {
              ...styles.headerStyle,
              backgroundColor: colors.dark,
            },
            headerShadowVisible: false,
            headerTitleStyle: { ...styles.headerTitleStyle, color: "white" },
            headerLeft: () => (
              <BackButton
                navigation={navigation}
                color="white"
                backgroundColor={colors.dark}
                borderWidth={0}
              />
            ),
            animationEnabled: true,
          })}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditEventScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailsScreen}
          options={({ navigation }) => ({
            title: "Event Detail",
            headerStyle: styles.headerStyle,
            headerTitleAlign: "center",
            headerTitleStyle: styles.headerTitleStyle,
            headerLeft: () => <BackButton navigation={navigation} />,
            headerShadowVisible: false,
            animationEnabled: true,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
