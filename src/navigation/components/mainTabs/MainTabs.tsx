import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { renderTabIcon } from "../tabIcons/TabIcons";
import CustomTabBarButton from "../customTabarButton/CustomTabarButton";
import { TouchableOpacity } from "react-native";
import Events from "../../../screens/events/Events";
import CreateEvent from "../../../screens/createEvent/CreateEvent";
import Profile from "../../../screens/profile/Profile";
import { colors } from "../../../constants/colors";
import LogoutButton from "../../../components/logoutButton/LogoutButton";
import Home from "../../../screens/home/Home";

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) =>
          renderTabIcon(route.name, focused, size),
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          backgroundColor: "white",
          borderTopWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        tabBarHideOnKeyboard: true,

        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{
          headerShown: false,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Disabled"
        component={Profile}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} disabled={true} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile Settings",
          headerStyle: { backgroundColor: "white", height: 70 },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: 14,
            color: colors.dark,
          },
          headerTitleAlign: "center",
          headerRight: () => <LogoutButton />,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
