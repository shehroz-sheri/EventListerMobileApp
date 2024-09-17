import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "../../hooks/useNavigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
  resetProfileState,
  updateProfile,
  uploadProfilePicture,
} from "../../redux/slices/profileSlice";
import { reauthenticateUser } from "../../utils/authUtils";
import { showToast } from "../../utils/toastUtils";
import { UserProfileData } from "../../types/types";
import getFirstAndLastName from "../../utils/splitName";

export const useProfile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState<UserProfileData>({
    displayName: "",
    email: "",
    photoURL: "https://via.placeholder.com/150",
  });
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { loading, updateSuccess, emailUpdateRequired } = useAppSelector(
    (state) => state.profile
  );

  const currentUser = auth()?.currentUser;

  let userInfo = () => {
    if (currentUser) {
      const { firstName, lastName } = getFirstAndLastName(
        currentUser?.displayName!
      );
      setUserData({
        displayName: currentUser?.displayName || "",
        email: currentUser?.email || "",
        photoURL:
          currentUser?.photoURL && currentUser?.photoURL?.length > 0
            ? currentUser?.photoURL
            : `https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}&size=250`,
      });
    }
  };

  useEffect(() => {
    userInfo();
  }, [currentUser]);

  useEffect(() => {
    if (updateSuccess) {
      if (emailUpdateRequired) {
        setModalVisible(true);
      } else {
        showToast("success", "Profile Updated Successfully");
      }
      dispatch(resetProfileState());
    }
  }, [updateSuccess, emailUpdateRequired, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(resetProfileState());
    }
  }, [updateSuccess, dispatch]);

  const handleChange = (key: keyof typeof userData, value: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleTogglePage = () => {
    navigation.navigate("ResetPassword");
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: false,
    });

    if (result?.errorCode) {
      showToast(
        "error",
        "Error",
        "Something went wrong. Please try again later."
      );
    } else if (result?.assets && result?.assets?.length > 0) {
      const selectedImage = result?.assets[0]?.uri;
      if (selectedImage) dispatch(uploadProfilePicture(selectedImage));
    }
  };

  const handleReauthenticate = async (password: string) => {
    const success = await reauthenticateUser(password);
    if (success) {
      setModalVisible(false);
      showToast("success", "Please Verify Your New Email.", "Check inbox!");
    }
  };

  const handleUpdateProfile = () => {
    dispatch(
      updateProfile({
        displayName: userData?.displayName,
        email: userData?.email,
        photoURL: userData?.photoURL,
      })
    )
      .then((res) => {
        if (
          res.payload === "Please reauthenticate before updating your profile."
        ) {
          setModalVisible(true);
        } else {
          showToast("success", "Profile Updated Successfully");
        }
      })
      .catch(() => {
        showToast(
          "error",
          "Update Failed!",
          "Something went wrong, Try again later!"
        );
      });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    userInfo();
    setRefreshing(false);
  };

  return {
    userData,
    isModalVisible,
    loading,
    refreshing,
    onRefresh,
    setModalVisible,
    handleChange,
    handleTogglePage,
    pickImage,
    handleReauthenticate,
    handleUpdateProfile,
  };
};
