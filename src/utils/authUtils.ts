import auth from "@react-native-firebase/auth";
import { showToast } from "./toastUtils";

export const reauthenticateUser = async (
  password: string
): Promise<boolean> => {
  const currentUser = auth()?.currentUser;

  if (currentUser && currentUser?.email) {
    const credential = auth.EmailAuthProvider.credential(
      currentUser?.email,
      password
    );

    try {
      await currentUser.reauthenticateWithCredential(credential);
      showToast("success", "Reauthentication Successful");
      return true;
    } catch (err: any) {
      showToast(
        "error",
        err?.code === "auth/invalid-credential"
          ? "Invalid Credentials"
          : "Reauthentication Failed"
      );
      return false;
    }
  }

  return false;
};
