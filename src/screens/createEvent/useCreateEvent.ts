import { useState, useEffect } from "react";
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from "react-native-image-picker";
import { showToast } from "../../utils/toastUtils";
import { CreateEventField, DatePickerEvent, Event } from "../../types/types";
import { useAppDispatch } from "../../hooks/useStore";
import { publishEvent, updateEvent } from "../../redux/slices/createEventSlice";
import { useNavigation } from "../../hooks/useNavigation";

type CreateEventDetails = {
  eventName: string;
  ticketPrice: string;
  eventDate: string;
  eventType?: string;
  eventLocation: string;
  googleMapsUrl: string;
};

const initialState: CreateEventDetails = {
  eventName: "",
  ticketPrice: "",
  eventDate: "",
  eventType: "",
  eventLocation: "",
  googleMapsUrl: "",
};

const initialEventState = {
  eventDetails: initialState,
  eventType: undefined as string | undefined,
  eventMedia: null as string | null,
  selectedDate: undefined as Date | undefined,
  showDatePicker: false,
  isDropdownOpen: false,
};

export const useCreateEvent = (eventParam?: Event) => {
  const [eventState, setEventState] = useState(initialEventState);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const handleChange = (name: keyof CreateEventDetails, value: string) => {
    setEventState((prev) => ({
      ...prev,
      eventDetails: { ...prev.eventDetails, [name]: value },
    }));
  };

  const handleSelectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.9,
    };

    launchImageLibrary(options, (response) => {
      if (response.errorMessage) {
        showToast(
          "error",
          "Error",
          "Something went wrong. Please try again later."
        );
      } else if (response?.assets && response?.assets?.length > 0) {
        const { uri } = response?.assets[0];
        setEventState((prev) => ({ ...prev, eventMedia: uri || null }));
      }
    });
  };

  const handlePublishEvent = async () => {
    const { eventName, ticketPrice, eventDate, eventLocation, googleMapsUrl } =
      eventState.eventDetails;

    if (
      eventName.length <= 2 ||
      !ticketPrice ||
      !eventDate ||
      !eventState.eventType ||
      !eventLocation ||
      !googleMapsUrl ||
      !eventState.eventMedia
    ) {
      showToast("error", "Please fill all fields correctly");
      return;
    }

    setLoading(true);

    dispatch(publishEvent(eventState))
      .unwrap()
      .then(() => {
        showToast("success", "Event created successfully");
        setEventState(initialEventState);
      })
      .catch((err) => {
        showToast(
          "error",
          "Event creation failed",
          err.message || "Something went wrong."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOptionSelect = (option: string) => {
    setEventState((prev) => ({
      ...prev,
      eventType: option,
      isDropdownOpen: false,
    }));
  };

  const onDateChange = (
    event: DatePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setEventState((prev) => ({
      ...prev,
      showDatePicker: false,
      selectedDate:
        event.type === "set" && selectedDate ? selectedDate : prev.selectedDate,
    }));
    if (event.type === "set" && selectedDate) {
      handleChange("eventDate", selectedDate.toISOString());
    }
  };

  const handleUpdateEvent = async () => {
    setLoading(true);
    try {
      if (eventParam) {
        await dispatch(updateEvent({ eventState, eventParam }));
        navigation.goBack();
        showToast("success", "Event updated successfully");
      }
    } catch (error) {
      showToast(
        "error",
        "Event update failed",
        "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventParam) {
      setEventState({
        eventDetails: {
          eventName: eventParam?.eventName || "",
          ticketPrice: eventParam?.ticketPrice?.toString() || "",
          eventDate: eventParam?.eventDate
            ? new Date(eventParam?.eventDate)?.toDateString()
            : "",
          eventLocation: eventParam?.location || "",
          googleMapsUrl: eventParam?.googleMapsUrl || "",
        },
        eventType: eventParam?.eventType || undefined,
        eventMedia: eventParam?.eventMediaUrl || null,
        selectedDate: eventParam?.eventDate
          ? new Date(eventParam?.eventDate)
          : undefined,
        showDatePicker: false,
        isDropdownOpen: false,
      });
    } else {
      setEventState(initialEventState);
    }
  }, [eventParam]);

  const fields: CreateEventField[] = [
    {
      key: "eventName",
      label: "Event Name",
      placeholder: "Event Name",
      defaultValue: eventState.eventDetails.eventName,
    },
    {
      key: "ticketPrice",
      label: "Ticket Price",
      placeholder: "Ticket Price",
      defaultValue: eventState.eventDetails.ticketPrice,
      prefix: "$",
      keyboardType: "numeric",
    },
    {
      key: "eventLocation",
      label: "Event Location",
      placeholder: "Select Location",
      defaultValue: eventState.eventDetails.eventLocation,
    },
    {
      key: "googleMapsUrl",
      label: "Google Maps URL",
      placeholder: "Map URL",
      defaultValue: eventState.eventDetails.googleMapsUrl,
    },
  ];

  return {
    eventDetails: eventState.eventDetails,
    eventType: eventState.eventType,
    loading,
    isDropdownOpen: eventState.isDropdownOpen,
    eventMedia: eventState.eventMedia,
    showDatePicker: eventState.showDatePicker,
    selectedDate: eventState.selectedDate,
    fields,
    handleChange,
    handleSelectImage,
    handlePublishEvent,
    handleOptionSelect,
    onDateChange,
    handleUpdateEvent,
    setShowDatePicker: (show: boolean) =>
      setEventState((prev) => ({ ...prev, showDatePicker: show })),
    setIsDropdownOpen: (open: boolean) =>
      setEventState((prev) => ({ ...prev, isDropdownOpen: open })),
  };
};
