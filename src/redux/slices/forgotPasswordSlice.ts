import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import { ForgotPasswordSliceState } from "../../types/types";

const initialState: ForgotPasswordSliceState = {
  loading: false,
  error: null,
  success: false,
};

export const sendPasswordResetEmail = createAsyncThunk(
  "forgotPassword/sendPasswordResetEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      await auth().sendPasswordResetEmail(email);
      return true;
    } catch (error: any) {
      if (error?.code === "auth/invalid-email")
        return rejectWithValue("Invalid email address.");
      else if (error?.code === "auth/user-not-found")
        return rejectWithValue("No user found with this email.");
      else return rejectWithValue("Something went wrong, please try again.");
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPasswordResetEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendPasswordResetEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendPasswordResetEmail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
