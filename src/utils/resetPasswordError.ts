import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { showToast } from "./toastUtils";

export const handleResetPasswordError = (
  error: FirebaseAuthTypes.NativeFirebaseAuthError
) => {
  if (error?.code === "auth/invalid-credential")
    showToast("error", "Old password is incorrect");
  else
    showToast(
      "error",
      "Password reset failed",
      "Something went wrong. Try again later."
    );
};
