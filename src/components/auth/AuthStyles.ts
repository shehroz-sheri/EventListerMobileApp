import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "90%",
    paddingTop: RFPercentage(2.5),
    paddingBottom: RFPercentage(5),
  },
  pageHeading: {
    fontSize: 32,
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
    textAlign: "center",
    paddingTop: RFPercentage(5),
    paddingBottom: RFPercentage(4),
  },
  formContainer: {
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(5),
  },
  switchPageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFPercentage(1.5),
  },
  switchPageText: {
    fontSize: 12,
    marginLeft: RFPercentage(2.5),
    fontFamily: "Poppins-Medium",
    color: colors.secondary,
  },
  switchPageLink: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: colors.primary,
  },
  actionButton: {
    height: 52,
    borderRadius: 28,
    marginTop: 48,
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    justifyContent: "center",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray,
    marginHorizontal: RFPercentage(1.5),
    opacity: 20,
  },
  orText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "black",
  },
  googleButton: {
    alignSelf: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
  },
});
