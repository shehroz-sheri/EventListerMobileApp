import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  AuthState,
  FirebaseUser,
  LoginUserData,
  RegisterUserData,
} from "../../types/types";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<
  FirebaseUser,
  RegisterUserData,
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  const { email, password, name } = userData;
  try {
    console.log(email, password, name);
    const res = await auth().createUserWithEmailAndPassword(email, password);
    await res?.user?.updateProfile({ displayName: name });
    await res?.user?.sendEmailVerification();
    await auth().signOut();
    return {
      uid: res?.user?.uid,
      email: res?.user?.email,
      displayName: res?.user?.displayName,
      photoURL: res?.user?.photoURL,
      isVerified: res?.user?.emailVerified,
    };
  } catch (error: any) {
    return rejectWithValue(error?.code);
  }
});

export const loginUser = createAsyncThunk<
  FirebaseUser,
  LoginUserData,
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  const { email, password } = userData;
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    if (!res?.user?.emailVerified) {
      await res?.user?.sendEmailVerification();
      await auth().signOut();
      throw new Error("Email not verified. Please check your inbox.");
    }
    return {
      uid: res?.user?.uid,
      email: res?.user?.email,
      displayName: res?.user?.displayName,
      photoURL: res?.user?.photoURL,
      isVerified: res?.user?.emailVerified,
    };
  } catch (error: any) {
    return rejectWithValue(
      error?.message === "Email not verified. Please check your inbox."
        ? "Email not verified. Please check your inbox."
        : error.code
    );
  }
});

export const googleLogin = createAsyncThunk<
  FirebaseUser,
  void,
  { rejectValue: string }
>("auth/googleLogin", async (_, { rejectWithValue }) => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const res = await auth().signInWithCredential(googleCredential);
    return {
      uid: res?.user?.uid,
      email: res?.user?.email,
      displayName: res?.user?.displayName,
      photoURL: res?.user?.photoURL,
      isVerified: res?.user?.emailVerified,
    };
  } catch (error: any) {
    return rejectWithValue(error?.code);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, { payload }: PayloadAction<FirebaseUser>) => {
        state.user = payload;
        state.loading = false;
      }
    );
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.error = payload || "Registration failed";
      state.loading = false;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, { payload }: PayloadAction<FirebaseUser>) => {
        state.user = payload;
        state.loading = false;
      }
    );
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.error = payload || "Login failed";
      state.loading = false;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      googleLogin.fulfilled,
      (state, { payload }: PayloadAction<FirebaseUser>) => {
        state.user = payload;
        state.loading = false;
      }
    );
    builder.addCase(googleLogin.rejected, (state, { payload }) => {
      state.error = payload || "Google login failed";
      state.loading = false;
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
