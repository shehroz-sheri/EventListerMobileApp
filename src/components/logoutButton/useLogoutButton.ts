import { useAppDispatch } from "../../hooks/useStore";
import auth from "@react-native-firebase/auth";
import { logoutUser } from "../../redux/slices/authSlice";
import { showToast } from "../../utils/toastUtils";
import { useNavigation } from "../../hooks/useNavigation";

export const useLogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(logoutUser());
        navigation.navigate("Login");
        showToast("success", "Logout Successful");
      })
      .catch(() => {
        showToast(
          "error",
          "Logout Failed!",
          "Something went wrong, Try again later!"
        );
      });
  };

  return { handleLogout };
};
