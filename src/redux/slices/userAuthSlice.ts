import { createSlice } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import { UserAuthState } from "../../types/types";

const initialState: UserAuthState = {
  user: null,
  loading: true,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = userAuthSlice.actions;

export const initializeAuth = () => (dispatch: any) => {
  dispatch(setLoading(true));
  const unsubscribe = auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    } else {
      dispatch(clearUser());
    }
    dispatch(setLoading(false));
  });

  return unsubscribe;
};

export default userAuthSlice.reducer;
