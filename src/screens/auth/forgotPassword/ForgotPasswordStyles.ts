import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 50,
    justifyContent: "center",
    backgroundColor: colors.lightGray,
  },
  title: {
    fontSize: 36,
    fontFamily: "Poppins-Bold",
    color: colors.charcoal,
    marginBottom: 10,
    textAlign: "center",
  },
  desc: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: colors.mediumGray,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 52,
    borderColor: colors.chineseSilver,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "white",
  },
  sendButton: {
    height: 52,
    backgroundColor: colors.violet,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
  },
  backButton: {
    alignSelf: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: colors.violet,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
});
