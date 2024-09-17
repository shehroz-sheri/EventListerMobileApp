import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: RFPercentage(3),
  },
  heading: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
    marginTop: RFPercentage(1.5),
    marginBottom: 43,
    width: "93%",
    alignSelf: "center",
  },
  searchContainer: {
    flexDirection: "row",
    borderColor: colors.gray,
    borderWidth: 0.5,
    borderRadius: 26,
    paddingHorizontal: RFPercentage(1),
    marginBottom: 23,
    height: 52,
    width: "93%",
    alignSelf: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: colors.dark,
    paddingRight: RFPercentage(2),
    paddingTop: 12,
  },
  searchIcon: {
    paddingHorizontal: 8,
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFPercentage(10),
  },
  noEventsText: {
    fontSize: RFPercentage(2.5),
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
  },
  horizontalCardContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: colors.light,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    padding: RFPercentage(1),
    marginVertical: 9,
    width: "93%",
    alignSelf: "center",
  },

  horizontalCardImage: {
    width: 88,
    height: 88,
    borderRadius: 12,
    marginRight: 12,
  },
  horizontalCardBody: {
    flex: 1,
    justifyContent: "center",
  },
  horizontalCardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHeading: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: colors.secondary,
  },
  eventDate: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: colors.secondary,
  },
});
