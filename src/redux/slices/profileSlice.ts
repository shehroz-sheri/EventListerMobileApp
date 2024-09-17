import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { ProfileSliceState } from "../../types/types";
import { showToast } from "../../utils/toastUtils";

const initialState: ProfileSliceState = {
  loading: false,
  error: null,
  updateSuccess: false,
  emailUpdateRequired: false,
};

export const updateProfile = createAsyncThunk<
  { emailUpdateRequired: boolean },
  { displayName: string; email: string; photoURL: string },
  { rejectValue: string }
>("profile/updateProfile", async (profileData, { rejectWithValue }) => {
  const currentUser = auth()?.currentUser;
  if (!currentUser) throw new Error("No user logged in");

  try {
    console.log("profileData: ", profileData);
    await currentUser.updateProfile({
      displayName: profileData?.displayName,
      photoURL: profileData?.photoURL,
    });

    if (profileData?.email !== currentUser?.email) {
      await currentUser.verifyBeforeUpdateEmail(profileData?.email);
      return { emailUpdateRequired: true };
    } else {
      showToast("success", "Profile Updated Successfully");
      return { emailUpdateRequired: false };
    }
  } catch (error: any) {
    console.log("error: ", error);
    return rejectWithValue(
      error?.code === "auth/requires-recent-login"
        ? "Please reauthenticate before updating your profile."
        : "Profile update failed. Please try again."
    );
  }
});

export const uploadProfilePicture = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("profile/uploadProfilePicture", async (imageUri, { rejectWithValue }) => {
  const currentUser = auth()?.currentUser;
  if (!currentUser) throw new Error("No user logged in");

  try {
    const reference = storage().ref(`/profilePictures/${currentUser.uid}.jpg`);
    await reference.putFile(imageUri);
    const downloadURL = await reference.getDownloadURL();

    await currentUser.updateProfile({
      photoURL: downloadURL,
    });

    return downloadURL;
  } catch (error) {
    return rejectWithValue(
      "Error uploading profile picture. Please try again."
    );
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.updateSuccess = false;
      state.error = null;
      state.emailUpdateRequired = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.updateSuccess = true;
      state.emailUpdateRequired = action.payload.emailUpdateRequired;
      if (!action.payload.emailUpdateRequired) {
        showToast("success", "Name Updated Successfully");
      }
    });
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || "Profile update failed";
    });

    builder.addCase(uploadProfilePicture.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadProfilePicture.fulfilled, (state) => {
      state.loading = false;
      state.updateSuccess = true;
      showToast("success", "Profile Picture Updated");
    });
    builder.addCase(uploadProfilePicture.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || "Error uploading profile picture";
    });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
