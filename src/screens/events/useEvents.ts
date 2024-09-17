import { useState, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { useNavigation } from "../../hooks/useNavigation";
import { RootState } from "../../redux/store";
import { fetchUserEvents } from "../../redux/slices/userEventsSlice";
import { UserEvent } from "../../types/types";

const useEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const { events, loading } = useAppSelector(
    (state: RootState) => state.userEvents
  );

  useEffect(() => {
    dispatch(fetchUserEvents());
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchUserEvents());
    setRefreshing(false);
  }, [dispatch]);

  const handleEventDetailScreen = useCallback(
    (eventId: string) => {
      navigation.navigate("EventDetail", { eventId });
    },
    [navigation]
  );

  const filteredEvents = events?.filter((event: UserEvent) =>
    event?.eventName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return {
    searchQuery,
    setSearchQuery,
    refreshing,
    handleRefresh,
    filteredEvents,
    handleEventDetailScreen,
    loading,
  };
};

export default useEvents;
