import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: RFPercentage(3),
    paddingHorizontal: RFPercentage(2),
  },
  heading: {
    textAlign: "center",
    fontSize: 22,
    color: colors.dark,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 32,
  },
  label: {
    marginBottom: 12,
    marginLeft: RFPercentage(0.6),
    fontFamily: "Poppins-SemiBold",
    color: colors.dark,
    fontSize: 14,
    marginTop: RFPercentage(0.6),
  },
  uploadContainer: {
    height: 161,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.dark,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
  },
  uploadText: {
    fontSize: 14,
    color: colors.dark,
    fontFamily: "Poppins-SemiBold",
  },
  eventButton: {
    height: 52,
    borderRadius: 28,
    marginTop: 33,
    marginBottom: RFPercentage(3),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  dropdownContainer: {
    marginBottom: 16,
    position: "relative",
  },
  dropdownButton: {
    height: 52,
    backgroundColor: colors.light,
    borderRadius: 26,
    paddingHorizontal: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    flex: 1,
    color: colors.dark,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dimGray,
  },
  dropdownModal: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 0.2,
    borderColor: colors.secondary,
  },
  dropdownItemText: {
    fontSize: 14,
    color: colors.dark,
    fontFamily: "Poppins-Regular",
  },
  dateInput: {
    borderRadius: 26,
    paddingHorizontal: 16,
    backgroundColor: colors.light,
    justifyContent: "center",
    marginBottom: 16,
    height: 52,
  },
  dateText: {
    fontSize: 14,
    color: colors.dark,
    fontFamily: "Poppins-Regular",
  },
});
