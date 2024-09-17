import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import { showToast } from "../../utils/toastUtils";
import { CreateEventDetails, CreateEventState, Event } from "../../types/types";
import { uniqueFileName } from "../../constants/constants";

const initialState: CreateEventState = {
  eventDetails: {
    eventName: "",
    ticketPrice: "",
    eventDate: "",
    eventType: "",
    eventLocation: "",
    googleMapsUrl: "",
  },
  eventType: undefined,
  eventMedia: null,
  selectedDate: undefined,
  showDatePicker: false,
  isDropdownOpen: false,
};

export const publishEvent = createAsyncThunk(
  "event/publishEvent",
  async (eventState: CreateEventState, { rejectWithValue }) => {
    try {
      const currentUser = auth()?.currentUser;

      if (!currentUser || !eventState?.eventMedia) {
        throw new Error("Invalid Response");
      }

      let eventMediaUrl = null;
      const reference = storage().ref(`events/${uniqueFileName}`);

      await reference.putFile(eventState?.eventMedia);
      eventMediaUrl = await reference.getDownloadURL();

      await firestore()
        .collection("events")
        .add({
          ...eventState.eventDetails,
          eventType: eventState?.eventType,
          userUid: currentUser?.uid,
          userName: currentUser?.displayName,
          creatorImageUrl: currentUser?.photoURL,
          eventMediaUrl,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      showToast("success", "Event created successfully");
      return;
    } catch (error: any) {
      showToast(
        "error",
        "Event creation failed",
        "Something went wrong. Please try again later."
      );
      return rejectWithValue(error?.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (
    {
      eventState,
      eventParam,
    }: { eventState: CreateEventState; eventParam: Event },
    { rejectWithValue }
  ) => {
    try {
      const updatedFields: Partial<CreateEventDetails> = {};
      const {
        eventName,
        ticketPrice,
        eventDate,
        eventLocation,
        googleMapsUrl,
      } = eventState.eventDetails;

      if (eventName !== eventParam?.eventName)
        updatedFields.eventName = eventName;
      if (ticketPrice !== eventParam?.ticketPrice?.toString())
        updatedFields.ticketPrice = ticketPrice;
      if (eventDate !== eventParam?.eventDate)
        updatedFields.eventDate = eventDate;
      if (eventLocation !== eventParam?.location)
        updatedFields.eventLocation = eventLocation;
      if (googleMapsUrl !== eventParam?.googleMapsUrl)
        updatedFields.googleMapsUrl = googleMapsUrl;
      if (
        eventState.eventType &&
        eventState.eventType !== eventParam?.eventType
      )
        updatedFields.eventType = eventState?.eventType;

      let eventMediaUrl = eventParam?.eventMediaUrl || null;
      if (
        eventState.eventMedia &&
        eventState.eventMedia !== eventParam?.eventMediaUrl
      ) {
        const reference = storage().ref(`events/${uniqueFileName}`);

        await reference.putFile(eventState.eventMedia);
        eventMediaUrl = await reference.getDownloadURL();
      }

      await firestore()
        .collection("events")
        .doc(eventParam?.eventUid)
        .update({
          ...updatedFields,
          eventMediaUrl,
        });

      showToast("success", "Event updated successfully");
      return eventState;
    } catch (error: any) {
      showToast(
        "error",
        "Event update failed",
        "Something went wrong. Please try again later."
      );
      return rejectWithValue(error.message);
    }
  }
);

const createEventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventDetails: (
      state,
      action: PayloadAction<Partial<CreateEventDetails>>
    ) => {
      state.eventDetails = { ...state.eventDetails, ...action.payload };
    },
    setEventMedia: (state, action: PayloadAction<string | null>) => {
      state.eventMedia = action.payload;
    },
    setEventType: (state, action: PayloadAction<string | undefined>) => {
      state.eventType = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<Date | undefined>) => {
      state.selectedDate = action.payload;
    },
    toggleDatePicker: (state, action: PayloadAction<boolean>) => {
      state.showDatePicker = action.payload;
    },
    toggleDropdown: (state, action: PayloadAction<boolean>) => {
      state.isDropdownOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(publishEvent.fulfilled, (state) => {
      state.eventDetails = initialState.eventDetails;
      state.eventType = undefined;
      state.eventMedia = null;
    });
  },
});

export const {
  setEventDetails,
  setEventMedia,
  setEventType,
  setSelectedDate,
  toggleDatePicker,
  toggleDropdown,
} = createEventSlice.actions;

export default createEventSlice.reducer;
