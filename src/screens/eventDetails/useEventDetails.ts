import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
  fetchEventDetails,
  handleBuyTicket,
} from "../../redux/slices/eventDetailsSlice";
import { RootState } from "../../redux/store";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "../../hooks/useNavigation";
import { UseEventDetailsProps } from "../../types/types";
import { Linking } from "react-native";
import { isValidUrl } from "../../utils/mapUrlValidation";
import { defaultMapImageUrl } from "../../constants/constants";

export const useEventDetails = ({ eventId }: UseEventDetailsProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = auth()?.currentUser;
  const userUid = user?.uid;

  const {
    event,
    loading: eventLoading,
    hasTicket,
  } = useAppSelector((state: RootState) => state.eventDetails);

  const fetchEvent = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchEventDetails(eventId)).unwrap();
    } finally {
      setRefreshing(false);
    }
  }, [eventId, dispatch]);

  useEffect(() => {
    fetchEvent()
  }, [fetchEvent])

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const handleBuyTicketPress = async () => {
    try {
      setLoading(true);
      await dispatch(handleBuyTicket(eventId)).unwrap();
    } finally {
      setLoading(false);
    }
  };

  const handleTicketDetailNavigation = () =>
    navigation.navigate("TicketDetail", { eventId });

  const handleEditEvent = () => {
    if (event?.eventUid) {
      navigation.navigate("EditEvent", {
        eventInfo: { ...event, eventUid: event?.eventUid },
      });
    }
  };

  const openMap = () => {
    if (event?.googleMapsUrl) {
      Linking.openURL(isValidUrl(event?.googleMapsUrl) ? event?.googleMapsUrl : defaultMapImageUrl);
    }
  };

  return {
    event,
    loading,
    hasTicket,
    refreshing,
    isExpanded,
    fetchEvent,
    userUid,
    openMap,
    eventLoading,
    toggleReadMore,
    handleBuyTicketPress,
    handleTicketDetailNavigation,
    handleEditEvent,
  };
};
