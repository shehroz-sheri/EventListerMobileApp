import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./HeaderOptionsStyles";
import { NavigationProp } from "../../../types/types";

export const getDefaultHeaderOptions = (
  navigation: NavigationProp,
  title: string
) => ({
  title,
  headerStyle: {
    backgroundColor: "white",
    height: 90,
  },
  headerTitleStyle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  headerShadowVisible: false,
  headerTitleAlign: "center",
  headerTitleContainerStyle: {
    justifyContent: "center",
  },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.headerLeft}
    >
      <Icon name="arrow-back" size={22} color="black" />
    </TouchableOpacity>
  ),
  headerLeftContainerStyle: {
    justifyContent: "center",
  },
  animationEnabled: true,
});
