import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { RFPercentage } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  eventPriceContainer: {
    backgroundColor: colors.lightPurple,
    height: 25,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 40,
    marginRight: RFPercentage(1),
  },
  eventPriceFreeContainer: {
    backgroundColor: colors.lightGreen,
  },
  eventPrice: {
    fontSize: 10,
    fontFamily: "Poppins-SemiBold",
    color: colors.primary,
  },
  eventPriceFree: {
    color: colors.green,
  },
});
