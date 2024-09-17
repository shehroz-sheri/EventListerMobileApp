import { useEffect, useState } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { RootState } from "../../redux/store";
import { fetchEvents } from "../../redux/slices/eventsSlice";
import { EventType } from "../../types/types";

export const useHome = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector(
    (state: RootState) => state.events
  );

  const [filters, setFilters] = useState({
    priceRange: null as number | null,
    date: null as Date | null,
    category: null as string | null,
  });
  const [eventsState, setEventsState] = useState({
    onGoingEvents: [] as EventType[],
    otherEvents: [] as EventType[],
  });
  const [paginationState, setPaginationState] = useState({
    showMoreOnGoing: false as boolean,
    showMoreOther: false as boolean,
  });
  const [uiState, setUIState] = useState({
    filterModalVisible: false as boolean,
    datePickerVisible: false as boolean,
    categoryDropdownVisible: false as boolean,
  });

  const { onGoingEvents, otherEvents } = eventsState;
  const { showMoreOnGoing, showMoreOther } = paginationState;
  const { filterModalVisible, datePickerVisible, categoryDropdownVisible } =
    uiState;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilteredContent, setShowFilteredContent] =
    useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);

  const fetchAllEvents = () => dispatch(fetchEvents());

  useEffect(() => {
    fetchAllEvents();
  }, [dispatch]);

  useEffect(() => {
    if (events?.length > 0) categorizeEvents(events);
  }, [events]);

  const resetFilters = () => {
    setFilters({
      priceRange: null,
      date: null,
      category: null,
    });
    setShowFilteredContent(false);
    setUIState((prev) => ({ ...prev, filterModalVisible: false }));
    categorizeEvents(events);
  };

  const filterEvents = () => {
    if (
      !filters.date &&
      filters.category === null &&
      filters.priceRange === null
    ) {
      return events;
    }

    let filteredEvents = [...events];

    if (filters.category) {
      filteredEvents = filteredEvents?.filter(
        (event) => event?.eventType === filters?.category
      );
    }

    if (filters.date) {
      filteredEvents = filteredEvents?.filter(
        (event) =>
          new Date(event?.eventDate)?.toDateString() ===
          filters?.date!.toDateString()
      );
    }

    if (filters.priceRange !== null) {
      const priceRanges = ["0", "250", "1000", "5000"];
      const selectedPrice = priceRanges[filters?.priceRange!];
      filteredEvents = filteredEvents?.filter(
        (event) => event?.ticketPrice <= selectedPrice
      );
    }

    return filteredEvents;
  };

  const applyFilters = () => {
    const filteredEvents = filterEvents();
    categorizeEvents(filteredEvents);
    setShowFilteredContent(true);
    setUIState((prev) => ({ ...prev, filterModalVisible: false }));
  };

  const removeFilter = (filterType: "price" | "date" | "category") =>
    setFilters((prev) => ({
      ...prev,
      [filterType === "price" ? "priceRange" : filterType]: null,
    }));

  useEffect(() => {
    if (!filters.category && !filters.date && filters.priceRange === null) {
      setFilteredEvents(events);
    }
  }, [filters, events, removeFilter]);

  const categorizeEvents = (events: EventType[]) => {
    const now = new Date();
    const futureOrCurrentEvents = events?.filter(
      (event) => new Date(event?.eventDate) >= now
    );
    const pastEvents = events?.filter(
      (event) => new Date(event?.eventDate) < now
    );

    setEventsState({
      onGoingEvents: futureOrCurrentEvents?.sort(
        (a, b) =>
          new Date(a?.eventDate)?.getTime() - new Date(b?.eventDate)?.getTime()
      ),
      otherEvents: pastEvents?.sort(
        (a, b) =>
          new Date(b?.eventDate)?.getTime() - new Date(a?.eventDate).getTime()
      ),
    });
    setFilteredEvents([...futureOrCurrentEvents, ...pastEvents]);
  };

  const searchedEvents = events?.filter((event) => {
    return event?.eventName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
  });

  const handleEventDetailScreen = (eventId: string) => {
    navigation.navigate("EventDetail", { eventId });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    fetchAllEvents();
    setRefreshing(false);
  };

  return {
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    showFilteredContent,
    refreshing,
    filteredEvents,
    resetFilters,
    applyFilters,
    removeFilter,
    searchedEvents,
    handleEventDetailScreen,
    onRefresh,
    loading,
    error,
    setEventsState,
    setPaginationState,
    setUIState,
    onGoingEvents,
    otherEvents,
    showMoreOnGoing,
    showMoreOther,
    filterModalVisible,
    datePickerVisible,
    categoryDropdownVisible,
  };
};
