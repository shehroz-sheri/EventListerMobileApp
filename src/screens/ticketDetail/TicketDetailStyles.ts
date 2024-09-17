import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { RFPercentage } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: colors.dark,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "90%",
    maxWidth: 335,
    alignSelf: "center",
    padding: RFPercentage(1),
    marginTop: RFPercentage(3),
    borderRadius: 16,
    marginBottom: RFPercentage(6),
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    marginBottom: 23,
  },
  badgeContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "white",
    height: 32,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 40,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: colors.dark,
  },
  cardHeading: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
  },
  cardBody: {
    marginHorizontal: 8,
    gap: 16,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoContainer: {
    gap: 4,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventInfoHeading: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: colors.secondary,
  },
  eventInfoText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: colors.dark,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark,
  },
  ticketCutLine: {
    borderBottomColor: colors.dark,
    borderBottomWidth: 1,
    width: "90%",
    alignSelf: "center",
    marginBottom: 25,
    marginTop: 12,
    borderStyle: "dashed",
  },
  barcodeContainer: {
    height: 82,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  barcodeImage: {
    minWidth: "90%",
    maxWidth: 290,
    height: 82,
  },
  scanBarcodeText: {
    color: colors.dark,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    alignSelf: "center",
    marginBottom: 16,
  },
});
