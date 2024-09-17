import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 12,
    marginLeft: RFPercentage(0.6),
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 26,
  },
  input: {
    flex: 1,
    height: 52,
    maxHeight: 52,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.dark,
  },
  inputWithPrefix: {
    paddingLeft: 0,
  },
  prefix: {
    fontSize: 14,
    color: "gray",
    marginLeft: RFPercentage(2.5),
    marginRight: RFPercentage(1),
  },
  forgotPassword: {
    fontFamily: "Poppins-Medium",
    color: colors.primary,
    marginTop: 16,
    fontSize: 12,
    textAlign: "right",
    marginRight: RFPercentage(0.6),
  },
});
