import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  DiscoverFilled,
  DiscoverIcon,
  ProfileFilled,
  ProfileIcon,
  TicketIcon,
} from "../../../assets";
import { colors } from "../../../constants/colors";
import { styles } from "./TabIconsStyles";

export const renderTabIcon = (
  routeName: string,
  focused: boolean,
  size: number
) => {
  switch (routeName) {
    case "Home":
      return (
        <Icon
          name={focused ? "heart" : "heart-outline"}
          size={size}
          color={focused ? colors.dark : colors.gray}
        />
      );
    case "Events":
      return focused ? (
        <DiscoverFilled width={24} height={24} />
      ) : (
        <DiscoverIcon width={24} height={24} />
      );
    case "CreateEvent":
      return (
        <View style={styles.plusTabButton}>
          <Icon name="add-circle" size={60} color={colors.primary} />
        </View>
      );
    case "Profile":
      return focused ? (
        <ProfileFilled width={24} height={24} />
      ) : (
        <ProfileIcon width={24} height={24} />
      );
    case "Disabled":
      return <TicketIcon width={24} height={24} />;
    default:
      return null;
  }
};
