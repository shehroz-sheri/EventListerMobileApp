import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import forgotPasswordReducer from "./slices/forgotPasswordSlice";
import eventDetailsReducer from "./slices/eventDetailsSlice";
import eventsReducer from "./slices/eventsSlice";
import resetPasswordReducer from "./slices/resetPasswordSlice";
import ticketDetailReducer from "./slices/ticketDetailSlice";
import profileReducer from "./slices/profileSlice";
import userEventsReducer from "./slices/userEventsSlice";
import userAuthReducer from "./slices/userAuthSlice";
import createEventReducer from "./slices/createEventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    eventDetails: eventDetailsReducer,
    events: eventsReducer,
    resetPassword: resetPasswordReducer,
    ticketDetail: ticketDetailReducer,
    profile: profileReducer,
    userEvents: userEventsReducer,
    userAuth: userAuthReducer,
    createEvent: createEventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
