import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";
import { EventsState, EventType } from "../../types/types";

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await firestore().collection("events").get();
      const fetchedEvents: EventType[] = snapshot?.docs?.map((doc) => {
        const data = doc.data();

        return {
          id: doc?.id,
          createdAt: data?.createdAt,
          creatorImageUrl: data?.creatorImageUrl,
          eventDate: data?.eventDate,
          eventLocation: data?.eventLocation,
          eventMediaUrl: data?.eventMediaUrl,
          eventName: data?.eventName,
          eventType: data?.eventType,
          googleMapsUrl: data?.googleMapsUrl,
          ticketPrice: data?.ticketPrice,
          userName: data?.userName,
          userUid: data?.userUid,
        };
      });
      return fetchedEvents;
    } catch (error) {
      return rejectWithValue("Error fetching events");
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventsSlice.reducer;
