import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEventDetails } from "./useEventDetails";
import { dummyDescription } from "../../constants/constants";
import EventPrice from "../../components/eventPrice/EventPrice";
import { formatEventDate } from "../../utils/formatEventDate";
import Loader from "../../components/loader/Loader";
import { styles } from "./EventDetailsStyles";
import { RootStackParamList } from "../../types/types";

const EventDetails: React.FC = () => {
  const { eventId } =
    useRoute<RouteProp<RootStackParamList, "EventDetail">>().params;

  const {
    event,
    loading,
    eventLoading,
    hasTicket,
    refreshing,
    isExpanded,
    toggleReadMore,
    handleBuyTicketPress,
    fetchEvent,
    userUid,
    openMap,
    handleTicketDetailNavigation,
    handleEditEvent,
  } = useEventDetails({ eventId });

  if (eventLoading) return <Loader />;

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchEvent} />
        }
      >
        <View style={styles.cardContainer}>
          <View>
            <Image
              source={{ uri: event?.eventMediaUrl }}
              style={styles.cardImage}
            />
          </View>
          <View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardHeading}>{event?.eventName}</Text>
              <EventPrice ticketPrice={event?.ticketPrice} />
            </View>
            <Text style={styles.eventDate}>
              <Text style={styles.eventParticipants}>
                {event?.participants?.length}
              </Text>{" "}
              Participant{event?.participants?.length > 1 ? "s" : ""} •{" "}
              {formatEventDate(event?.eventDate)}
            </Text>
            <View style={styles.eventDetailContainer}>
              <Text style={styles.eventDetailTitle}>About Event</Text>
              <Text
                style={styles.eventDetail}
                numberOfLines={isExpanded ? undefined : 3}
                ellipsizeMode="tail"
              >
                {event?.description || dummyDescription}
              </Text>
              {!isExpanded ? (
                <TouchableOpacity onPress={toggleReadMore}>
                  <Text style={styles.readMoreLink}>Read More</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={toggleReadMore}>
                  <Text style={styles.readMoreLink}>Show Less</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.creatorInfo}>
              <Image
                source={{ uri: event?.creatorImageUrl }}
                style={styles.creatorImage}
              />
              <Text style={styles.creatorName}>{event?.userName}</Text>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <Text style={styles.mapHeading}>Maps</Text>
            <TouchableOpacity onPress={openMap}>
              <Image
                source={{ uri: event?.googleMapsUrl }}
                // source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vWjhnlplH3Wp3ffDubdw2Km1ixBt0N5Xbg&s" }}
                style={styles.mapImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={
          hasTicket
            ? handleTicketDetailNavigation
            : event?.creatorUid === userUid
            ? handleEditEvent
            : handleBuyTicketPress
        }
      >
        <Text style={styles.actionButtonText}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : hasTicket ? (
            "Ticket Details"
          ) : event?.creatorUid === userUid ? (
            "Edit Event"
          ) : (
            "Buy Ticket"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDetails;
