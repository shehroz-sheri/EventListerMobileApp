import { useEffect, useState } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import {
  resetState,
  sendPasswordResetEmail,
} from "../../../redux/slices/forgotPasswordSlice";
import { showToast } from "../../../utils/toastUtils";

const useForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState<string>("");

  const handleSendEmail = async () => {
    if (!email) {
      showToast("error", "Error", "Please enter your email address.");
      return;
    }
    dispatch(sendPasswordResetEmail(email));
  };

  useEffect(() => {
    if (success) {
      showToast(
        "success",
        "Password Reset Email Sent",
        "Please check your email inbox for instructions."
      );
      navigation.navigate("Login");
      dispatch(resetState());
    }

    if (error) {
      showToast("error", "Error", error);
    }
  }, [success, error, navigation, dispatch]);

  const handleLoginScreen = () => navigation.navigate("Login");

  return {
    email,
    setEmail,
    loading,
    handleSendEmail,
    handleLoginScreen,
  };
};

export default useForgotPassword;
