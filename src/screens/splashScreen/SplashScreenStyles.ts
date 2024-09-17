import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 52,
    fontFamily: "Poppins-SemiBold",
    marginBottom: -28,
    color: "white",
  },
  desc: {
    fontSize: RFPercentage(2.5),
    fontFamily: "Poppins-Regular",
    color: "white",
  },
});
