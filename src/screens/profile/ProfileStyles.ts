import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: RFPercentage(3),
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  inputFieldsContainer: {
    flex: 1,
  },
  buttonsContainer: {
    paddingTop: RFPercentage(2),
    gap: 16,
  },
  updateContainer: {
    width: "100%",
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  updateText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  resetPasswordContainer: {
    borderColor: colors.primary,
    height: 52,
    borderWidth: 4,
    borderRadius: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  resetPassText: {
    color: colors.primary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: RFPercentage(4),
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 71,
    borderWidth: 1,
    borderColor: colors.dark,
    borderStyle: "dashed",
    backgroundColor: colors.light,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 8,
    left: 205,
    backgroundColor: colors.dark,
    width: 16,
    height: 16,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
});
