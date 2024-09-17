import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import {
  defaultMapImageUrl,
  dummyDescription,
} from "../../constants/constants";
import { EventState, ReduxEvent } from "../../types/types";
import { isValidUrl } from "../../utils/mapUrlValidation";
import getFirstAndLastName from "../../utils/splitName";

const initialState: EventState = {
  event: null,
  loading: false,
  error: null,
  hasTicket: false,
};

export const fetchEventDetails = createAsyncThunk(
  "eventDetails/fetchEventDetails",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const eventDoc = await firestore()
        .collection("events")
        .doc(eventId)
        .get();
      if (eventDoc.exists) {
        const data = eventDoc.data();
        if (data) {
          const user = auth()?.currentUser;
          const userUid = user?.uid;
          const participants = data?.participants || [];
          const hasUserTicket = participants?.some(
            (participant: { uid: string }) => participant?.uid === userUid
          );

          const mapImage = defaultMapImageUrl;

          const { firstName, lastName } = getFirstAndLastName(data?.userName);

          const eventData: ReduxEvent = {
            creatorUid: data?.userUid,
            eventType: data?.eventType,
            eventName: data?.eventName,
            ticketPrice: data?.ticketPrice,
            participants: data?.participants || [],
            createdAt: data?.createdAt?.toDate()?.toISOString(),
            description: data?.description || dummyDescription,
            eventMediaUrl: data?.eventMediaUrl,
            creatorImageUrl:
              data?.creatorImageUrl ||
              `https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}&size=250`,
            userName: data?.userName,
            location: data?.eventLocation,
            googleMapsUrl: mapImage,
            eventUid: eventDoc?.id,
            eventDate: data?.eventDate,
          };

          return { eventData, hasUserTicket };
        }
      } else {
        return rejectWithValue("Event not found");
      }
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const handleBuyTicket = createAsyncThunk(
  "eventDetails/handleBuyTicket",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const user = auth().currentUser;
      const userUid = user?.uid;

      if (userUid) {
        await firestore()
          .collection("events")
          .doc(eventId)
          .update({
            participants: firestore.FieldValue.arrayUnion({ uid: userUid }),
          });

        Toast.show({
          type: "success",
          text1: "Ticket purchased successfully!",
        });

        return true;
      }
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

const eventDetailsSlice = createSlice({
  name: "eventDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        if (action.payload) {
          state.event = action.payload.eventData;
          state.hasTicket = action.payload.hasUserTicket;
        }
        state.loading = false;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(handleBuyTicket.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(handleBuyTicket.fulfilled, (state) => {
        state.hasTicket = true;
        state.loading = false;
      })
      .addCase(handleBuyTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventDetailsSlice.reducer;
