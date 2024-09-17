import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  logoutContainer: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(18),
    alignItems: "center",
    marginRight: 10,
  },
  logoutText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: RFValue(11),
  },
});
