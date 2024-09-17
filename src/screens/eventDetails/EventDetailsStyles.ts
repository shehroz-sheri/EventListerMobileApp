import { RFPercentage } from "react-native-responsive-fontsize";
import { colors } from "../../constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: RFPercentage(1.5),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  cardContainer: {
    padding: RFPercentage(1),
    marginBottom: RFPercentage(3),
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 20,
  },
  cardHeading: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: RFPercentage(0.6),
  },
  creatorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  creatorImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  creatorName: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: colors.dark,
  },
  eventParticipants: {
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
    fontSize: 12,
  },
  eventDate: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: colors.secondary,
  },
  eventDetailContainer: {
    marginTop: 30,
    marginBottom: 33,
  },
  eventDetailTitle: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
    marginBottom: 8,
  },
  eventDetail: {
    fontFamily: "Poppins-Regular",
    color: colors.secondary,
    fontSize: 14,
  },
  mapContainer: {
    marginTop: 33,
  },
  mapHeading: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
    marginBottom: 20,
  },
  mapImage: {
    width: "100%",
    height: 140,
    borderRadius: 16,
  },
  actionButton: {
    height: 52,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: "100%",
    marginTop: 32,
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  readMoreLink: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: colors.primary,
  },
});
