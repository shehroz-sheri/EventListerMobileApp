import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
    height: 42,
    width: 42,
    borderWidth: 0.5,
    borderColor: colors.gray,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
