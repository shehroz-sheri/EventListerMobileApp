import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import { Passwords, ResetPasswordSliceState } from "../../types/types";
import { validatePasswords } from "../../utils/validatePassword";
import { showToast } from "../../utils/toastUtils";
import { initialPasswordState } from "../../screens/resetPassword/useResetPassword";

const initialState: ResetPasswordSliceState = {
  loading: false,
  error: null,
};

export const resetPassword = createAsyncThunk(
  "resetPassword/resetPassword",
  async (passwords: Passwords, { rejectWithValue }) => {
    if (!validatePasswords(passwords)) return;

    const { oldPassword, newPassword } = passwords;
    const currentUser = auth()?.currentUser;

    if (!currentUser || !oldPassword || !newPassword) {
      return rejectWithValue("Invalid user or password");
    }

    try {
      const credential = auth.EmailAuthProvider.credential(
        currentUser?.email || "",
        oldPassword
      );

      await currentUser.reauthenticateWithCredential(credential);
      await currentUser.updatePassword(newPassword);

      showToast("success", "Password reset successfully");

      return initialPasswordState;
    } catch (error: any) {
      return rejectWithValue(error?.code);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default resetPasswordSlice.reducer;
