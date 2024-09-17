import { useEffect, useState } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "../../hooks/useNavigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { RootState } from "../../redux/store";
import {
  googleLogin,
  loginUser,
  registerUser,
} from "../../redux/slices/authSlice";
import { showToast } from "../../utils/toastUtils";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export const useAuth = (isRegisterPage?: boolean) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { user, loading: authLoading } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "789880835282-qjsjkbdd4t1pjnjaofi0pidd8esi0346.apps.googleusercontent.com",
    });
  }, []);

  const handleTogglePage = () =>
    navigation.navigate(isRegisterPage ? "Login" : "Register");

  const handleRegister = () => {
    if (userData.name.length < 3 || !userData.email || !userData.password)
      return showToast("error", "Please fill all fields!");
    
    dispatch(registerUser(userData))
      .unwrap()
      .then(() => {
        showToast(
          "success",
          "Registration Successful",
          "Please verify your email before logging in."
        );
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log('registration error', err)
        showToast(
          "error",
          "Registration Failed!",
          err === "auth/email-already-in-use"
            ? "Email already in use"
            : err.message
        );
      });
  };

  const handleLogin = () => {
    if (!userData.email || !userData.password)
      return showToast("error", "Please fill all fields!");
    dispatch(loginUser({ email: userData.email, password: userData.password }))
      .unwrap()
      .then(() => {
        navigation.navigate("MainTabs");
        showToast(
          "success",
          "Login Successful",
          `Welcome, ${user?.displayName || "User"}!`
        );
        setUserData(initialState);
      })
      .catch((err) => {
        if (err === "Email not verified. Please check your inbox.")
          return showToast("error", "Login Failed!", err);
        if (err === "auth/too-many-requests")
          return showToast(
            "error",
            "Login Failed!",
            "Too many requests, please try again later."
          );

        showToast("error", "Login Failed!", "Invalid Credentials");
      });
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      auth.GoogleAuthProvider.credential(idToken);
      dispatch(googleLogin())
        .unwrap()
        .then(() => {
          navigation.navigate("MainTabs");
          showToast("success", "Login Successful", "Welcome to the app!");
        })
        .catch(() =>
          showToast(
            "error",
            "Login Failed!",
            "Something went wrong, please try again later!"
          )
        );
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED)
        showToast("error", "Google Login Cancelled!");
      else if (error.code === statusCodes.IN_PROGRESS)
        showToast("error", "Login in Progress!");
      else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
        showToast("error", "Play Services Not Available!");
      else
        showToast(
          "error",
          "Login Failed!",
          "Something went wrong, please try again later!"
        );
    }
  };

  const inputFields = [
    {
      label: "Name",
      placeholder: "Enter your name",
      value: userData.name,
      onChangeText: (text: string) =>
        setUserData((prev) => ({ ...prev, name: text })),
      keyboardType: "default",
      show: isRegisterPage,
    },
    {
      label: "Email",
      placeholder: "Enter your email",
      value: userData.email,
      onChangeText: (text: string) =>
        setUserData((prev) => ({ ...prev, email: text })),
      keyboardType: "email-address",
      show: true,
    },
    {
      label: "Password",
      placeholder: "Enter your password",
      value: userData.password,
      onChangeText: (text: string) =>
        setUserData((prev) => ({ ...prev, password: text })),
      secureTextEntry: true,
      loginPage: !isRegisterPage,
      show: true,
    },
  ];

  return {
    authLoading,
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    handleTogglePage,
    inputFields,
  };
};
