import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: RFPercentage(4),
  },
  formContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: RFPercentage(5),
  },
  actionButtonContainer: {
    marginTop: RFPercentage(5),
    alignSelf: "center",
    width: "90%",
  },
  actionButton: {
    height: 52,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: "100%",
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});
