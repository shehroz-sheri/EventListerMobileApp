import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";
import { TicketDetailState, TicketEvent } from "../../types/types";
import getFirstAndLastName from "../../utils/splitName";

const initialState: TicketDetailState = {
  event: null,
  loading: false,
  error: null,
};

export const fetchEvent = createAsyncThunk<
  TicketEvent,
  string,
  { rejectValue: string }
>("ticketDetail/fetchEvent", async (eventId, { rejectWithValue }) => {
  try {
    const eventDoc = await firestore().collection("events").doc(eventId).get();
    if (eventDoc.exists) {
      const data = eventDoc.data();
      if (data) {
        const { firstName, lastName } = getFirstAndLastName(data?.userName);

        const eventData: TicketEvent = {
          uid: data?.uid,
          eventName: data?.eventName,
          ticketPrice: data?.ticketPrice,
          participants: data?.participants || [],
          createdAt: data?.createdAt?.toDate(),
          description: data?.description || "",
          eventMediaUrl: data?.eventMediaUrl,
          creatorImageUrl:
            data?.creatorImageUrl ||
            `https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}&size=250`,
          userName: data?.userName,
          eventType: data?.eventType,
          eventLocation: data?.eventLocation,
          googleMapsUrl: data?.googleMapsUrl || "",
          userTicket: data?.userTicket || {},
        };
        return eventData;
      }
    }
    throw new Error("Event not found");
  } catch (error: any) {
    return rejectWithValue(error?.message || "Failed to fetch event");
  }
});

const ticketDetailSlice = createSlice({
  name: "ticketDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEvent.fulfilled,
        (state, action: PayloadAction<TicketEvent>) => {
          state.event = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchEvent.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to fetch event";
          state.loading = false;
        }
      );
  },
});

export default ticketDetailSlice.reducer;
