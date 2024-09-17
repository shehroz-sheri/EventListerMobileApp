import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 160,
    justifyContent: "center",
    gap: 12,
    borderColor: "gray",
    borderWidth: 1,
  },
  heading:{
    color: colors.dark,
    fontFamily: "Poppins-Medium",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    color: colors.dark,
  },
});
