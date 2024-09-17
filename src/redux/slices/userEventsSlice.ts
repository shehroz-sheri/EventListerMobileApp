import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { EventsSliceState, UserEvent } from "../../types/types";

const initialState: EventsSliceState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchUserEvents = createAsyncThunk<UserEvent[], void>(
  "userEvents/fetchUserEvents",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = auth()?.currentUser;

      if (currentUser) {
        const eventsSnapshot = await firestore()
          .collection("events")
          .where("userUid", "==", currentUser?.uid)
          .get();

        const fetchedEvents: UserEvent[] = eventsSnapshot?.docs?.map((doc) => ({
          id: doc?.id,
          ...doc.data(),
        })) as UserEvent[];

        return fetchedEvents;
      }
      return [];
    } catch (error) {
      return rejectWithValue("Failed to fetch events");
    }
  }
);

const userEventsSlice = createSlice({
  name: "userEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userEventsSlice.reducer;
