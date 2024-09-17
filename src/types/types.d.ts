import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../hooks/useNavigation";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type AuthProps = {
  isRegisterPage?: boolean;
};

export type ToastType = "success" | "error";

export type InputFieldProps = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  label?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  forgotPassword?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  loginPage?: boolean;
  prefix?: string;
  options?: string[];
  onSelectOption?: (option: string) => void;
};

export type User = {
  name?: string;
  email: string;
  password: string;
};

export type Passwords = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type EventDetails = {
  eventName: string;
  ticketPrice: string;
  eventDate: string;
  eventType: string;
  eventLocation: string;
  googleMapsUrl: string;
};

export type CreateEventDetails = {
  eventName: string;
  ticketPrice: string;
  eventDate: string;
  eventType?: string;
  eventLocation: string;
  googleMapsUrl: string;
};

export type eventUser = {
  uid: string;
  displayName: string;
};

export type DataURL = {
  height: number;
  width: number;
  uri: string;
};

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
};

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
};

export type ReauthenticateModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onReauthenticate: (password: string) => void;
};

export type Event = {
  eventName: string;
  eventType: string;
  ticketPrice: number;
  participants: { uid: string; name: string }[];
  createdAt: Date;
  description: string;
  eventDate?: string;
  eventMediaUrl: string;
  location: string;
  creatorImageUrl: string;
  userName: string;
  googleMapsUrl: string;
  eventUid?: string;
};

export type CreateEventProps = {
  eventParam?: Event | undefined;
};

export type DatePickerEvent = {
  nativeEvent: {
    timestamp: number;
    utcOffset: number;
  };
  type: string;
};

export type CreateEventField = {
  key: keyof EventDetails;
  label: string;
  placeholder: string;
  defaultValue: string;
  prefix?: string;
  keyboardType?: "default" | "numeric" | "email-address";
};

export type EditEventRouteProp = RouteProp<RootStackParamList, "EditEvent">;

export type UseEventDetailsProps = {
  eventId: string;
};

export type UserEvent = {
  id: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventMediaUrl?: string;
  eventType: string;
  ticketPrice: string;
};

export type UserProfileData = {
  displayName: string;
  email: string;
  photoURL: string;
};

export type TicketDetailRouteProp = RouteProp<
  RootStackParamList,
  "TicketDetail"
>;

export type FirebaseUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type AuthState = {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
};

export type RegisterUserData = {
  email: string;
  password: string;
  name: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type BackButtonProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
  color?: string;
  backgroundColor?: string;
  borderWidth?: number;
};

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  TicketDetail: { eventId: string };
  MainTabs?: { eventId: string };
  EditEvent?: { eventInfo: Event };
  EventDetail: { eventId: string };
  CreateEvent?: { eventInfo: Event | null };
};

export type CustomTabBarButtonProps = {
  onPress?: (
    event:
      | GestureResponderEvent
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type LoaderProps = {
  backgroundColor?: string;
  color?: string;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export type UserAuthState = {
  user: any | null;
  loading: boolean;
};

export type CreateEventState = {
  eventDetails: CreateEventDetails;
  eventType?: string;
  eventMedia?: string | null;
  selectedDate?: Date | undefined;
  showDatePicker: boolean;
  isDropdownOpen: boolean;
};

export type ReduxEvent = {
  creatorUid: string;
  eventName: string;
  eventType: string;
  ticketPrice: number;
  participants: { uid: string; name: string }[];
  createdAt: Date;
  description: string;
  eventMediaUrl: string;
  location: string;
  creatorImageUrl: string;
  userName: string;
  googleMapsUrl: string;
  eventUid?: string;
  eventDate: string;
};

export type EventState = {
  event: ReduxEvent | null;
  loading: boolean;
  error: string | null;
  hasTicket: boolean;
};
export interface EventType {
  createdAt: FirebaseFirestoreTypes.Timestamp;
  creatorImageUrl: string;
  eventDate: string;
  eventLocation: string;
  eventMediaUrl: string;
  eventName: string;
  eventType: string;
  googleMapsUrl: string;
  id: string;
  ticketPrice: string;
  userName: string;
  userUid: string;
}

export type EventsState = {
  events: EventType[];
  loading: boolean;
  error: string | null;
};

export type ForgotPasswordSliceState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

export type ProfileSliceState = {
  loading: boolean;
  error: string | null;
  updateSuccess: boolean;
  emailUpdateRequired: boolean;
};

export type ResetPasswordSliceState = {
  loading: boolean;
  error: string | null;
};

export type EventsSliceState = {
  events: UserEvent[];
  loading: boolean;
  error: string | null;
};

export type TicketEvent = {
  uid: string;
  eventName: string;
  ticketPrice: number;
  participants: Array<{ uid: string; name: string }>;
  createdAt: Date;
  eventLocation: string;
  eventType: string;
  description?: string;
  eventMediaUrl: string;
  creatorImageUrl?: string;
  userName: string;
  googleMapsUrl?: string;
  userTicket?: { name: string; uid: string };
};

export type TicketDetailState = {
  event: TicketEvent | null;
  loading: boolean;
  error: string | null;
};
