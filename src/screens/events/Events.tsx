import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import useEvents from "./useEvents";
import { UserEvent } from "../../types/types";
import { formatEventDate } from "../../utils/formatEventDate";
import { colors } from "../../constants/colors";
import EventPrice from "../../components/eventPrice/EventPrice";
import { styles } from "./EventsStyles";

const Events: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    refreshing,
    handleRefresh,
    filteredEvents,
    handleEventDetailScreen,
    loading,
  } = useEvents();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Event Postings</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <Icon name="search1" size={20} color={colors.secondary} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : filteredEvents.length === 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
            />
          }
        >
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No events found</Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
            />
          }
        >
          {filteredEvents?.map((event: UserEvent) => (
            <TouchableOpacity
              key={event?.id}
              onPress={() => handleEventDetailScreen(event?.id)}
            >
              <View style={styles.horizontalCardContainer}>
                <Image
                  source={{
                    uri:
                      event?.eventMediaUrl ||
                      "https://via.placeholder.com/100x100",
                  }}
                  style={styles.horizontalCardImage}
                />
                <View style={styles.horizontalCardBody}>
                  <View style={styles.horizontalCardInfo}>
                    <Text style={styles.badgeText}>{event?.eventType}</Text>
                    <EventPrice ticketPrice={parseInt(event?.ticketPrice)} />
                  </View>
                  <Text style={styles.cardHeading}>{event?.eventName}</Text>
                  <Text style={styles.eventDate}>
                    {formatEventDate(event?.eventDate)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Events;
