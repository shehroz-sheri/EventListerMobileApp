import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  RefreshControl,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/AntDesign";
import { useHome } from "./useHome";
import { eventCategories } from "../../constants/constants";
import { colors } from "../../constants/colors";
import EventPrice from "../../components/eventPrice/EventPrice";
import { formatEventDate } from "../../utils/formatEventDate";
import Loader from "../../components/loader/Loader";
import { styles } from "./HomeStyles";
import { EventCard } from "../../components/eventCard/EventCard";
import { HorizontalCard } from "../../components/horizontalCard/HorizontalCard";

const Home: React.FC = () => {
  const {
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
    setUIState,
    setPaginationState,
    onGoingEvents,
    otherEvents,
    showMoreOnGoing,
    showMoreOther,
    filterModalVisible,
    datePickerVisible,
    categoryDropdownVisible,
  } = useHome();

  if (loading) return <Loader />;

  if (error) {
    return (
      <View>
        <Text style={styles.errorText}>
          Error fetching events. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.outerContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Recent Events</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              setUIState((prev) => ({
                ...prev,
                filterModalVisible: true,
              }))
            }
          >
            <Icon name="filter" size={20} color={colors.dark} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.searchContainer}>
            <View style={styles.searchIcon}>
              <Icon name="search1" size={20} color={colors.gray} />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
        </View>
        {searchTerm?.length > 0 && searchedEvents?.length > 0 ? (
          <>
            <FlatList
              data={searchedEvents}
              keyExtractor={(item) => item?.id?.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <EventCard
                  item={item}
                  onPress={() => handleEventDetailScreen(item.id)}
                />
              )}
            />
          </>
        ) : !showFilteredContent ? (
          <>
            <View style={styles.onGoingEventsContainer}>
              <Text style={styles.goingEventText}>On Going Events</Text>
              {!showMoreOnGoing && onGoingEvents?.length > 1 ? (
                <TouchableOpacity
                  onPress={() =>
                    setPaginationState((prev) => ({
                      ...prev,
                      showMoreOnGoing: true,
                    }))
                  }
                >
                  <Text style={styles.seeAllText}>See More</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    setPaginationState((prev) => ({
                      ...prev,
                      showMoreOnGoing: false,
                    }))
                  }
                >
                  <Text style={styles.seeAllText}>See Less</Text>
                </TouchableOpacity>
              )}
            </View>
            {onGoingEvents?.length > 0 && (
              <>
                <FlatList
                  data={showMoreOnGoing ? onGoingEvents : [onGoingEvents[0]]}
                  keyExtractor={(item) => item?.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <EventCard
                      item={item}
                      onPress={() => handleEventDetailScreen(item?.id)}
                    />
                  )}
                />
              </>
            )}
          </>
        ) : (
          <>
            <View style={styles.appliedFiltersContainer}>
              {filters?.category && (
                <View style={styles.filterTag}>
                  <Text style={styles.selectedFilter}>{filters?.category}</Text>
                  <TouchableOpacity onPress={() => removeFilter("category")}>
                    <Text style={styles.crossIcon}>×</Text>
                  </TouchableOpacity>
                </View>
              )}
              {filters?.date && (
                <View style={styles.filterTag}>
                  <Text style={styles.selectedFilter}>
                    {filters?.date!.toDateString()}
                  </Text>
                  <TouchableOpacity onPress={() => removeFilter("date")}>
                    <Text style={styles.crossIcon}>×</Text>
                  </TouchableOpacity>
                </View>
              )}
              {filters?.priceRange !== null && (
                <View style={styles.filterTag}>
                  <Text style={styles.selectedFilter}>
                    {["$0", "$250", "$1000", "$5000"][filters?.priceRange]}
                  </Text>
                  <TouchableOpacity onPress={() => removeFilter("price")}>
                    <Text style={styles.crossIcon}>×</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {filteredEvents?.length > 0 &&
              filteredEvents?.map((event, i) => (
                <TouchableOpacity key={i}>
                  <View style={styles.cardContainer}>
                    <View>
                      <Image
                        source={{
                          uri:
                            event?.eventMediaUrl ||
                            "https://via.placeholder.com/300x150",
                        }}
                        style={styles.cardImage}
                      />
                      <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{event?.eventType}</Text>
                      </View>
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardHeading}>{event?.eventName}</Text>
                      <View style={styles.cardInfo}>
                        <View style={styles.creatorInfo}>
                          <Image
                            source={{
                              uri:
                                event?.creatorImageUrl ||
                                "https://via.placeholder.com/50",
                            }}
                            style={styles.creatorImage}
                          />
                          <Text style={styles.creatorName}>
                            {event?.userName}
                          </Text>
                        </View>
                        <EventPrice ticketPrice={Number(event?.ticketPrice)} />
                      </View>
                      <View style={styles.horizontalLine} />
                      <Text style={styles.eventDate}>
                        {formatEventDate(
                          new Date(event?.eventDate)?.toDateString()
                        )}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </>
        )}
        {!showFilteredContent && (
          <>
            <View style={styles.onGoingEventsContainer}>
              <Text style={styles.goingEventText}>Other Events</Text>
              {!showMoreOther && otherEvents.length > 7 && (
                <TouchableOpacity
                  onPress={() =>
                    setPaginationState((prev) => ({
                      ...prev,
                      showMoreOther: true,
                    }))
                  }
                >
                  <Text style={styles.seeAllText}>See More</Text>
                </TouchableOpacity>
              )}
            </View>
            {otherEvents?.length > 0 && (
              <>
                <FlatList
                  data={showMoreOther ? otherEvents : otherEvents?.slice(0, 7)}
                  keyExtractor={(item) => item?.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <HorizontalCard
                      item={item}
                      onPress={() => handleEventDetailScreen(item?.id)}
                    />
                  )}
                />
              </>
            )}
          </>
        )}
        <Modal
          visible={filterModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() =>
            setUIState((prev) => ({
              ...prev,
              filterModalVisible: false,
            }))
          }
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.filterHeading}>Filter</Text>
                <View style={styles.filterCenter}></View>
                <TouchableOpacity onPress={resetFilters}>
                  <Text style={styles.resetButton}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.priceRangeContainer}>
                <Text style={styles.label}>Price Range</Text>
                <View style={styles.priceRange}>
                  {["$0", "$250", "$1000", "$5000"].map((price, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.priceOption,
                        filters?.priceRange === index &&
                          styles.selectedPriceOption,
                      ]}
                      onPress={() =>
                        setFilters((prev) => ({ ...prev, priceRange: index }))
                      }
                    >
                      <Text
                        style={[
                          styles.priceOptionText,
                          filters?.priceRange === index &&
                            styles.selectedPriceOptionText,
                        ]}
                      >
                        {price}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.horizontalLine} />
              <Text style={styles.label}>Sort by Date</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() =>
                  setUIState((prev) => ({
                    ...prev,
                    datePickerVisible: true,
                  }))
                }
              >
                <Text style={styles.filterLabel}>
                  {filters?.date
                    ? filters?.date?.toDateString()
                    : "Select date range"}
                </Text>
              </TouchableOpacity>
              {datePickerVisible && (
                <DateTimePicker
                  value={filters?.date || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setUIState((prev) => ({
                      ...prev,
                      datePickerVisible: false,
                    }));
                    if (date) {
                      setFilters((prev) => ({ ...prev, date }));
                    }
                  }}
                />
              )}
              <Text style={styles.label}>Sort by Category</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() =>
                  setUIState((prev) => ({
                    ...prev,
                    categoryDropdownVisible: !categoryDropdownVisible,
                  }))
                }
              >
                <Text style={styles.filterLabel}>
                  {filters?.category || "Select Category"}
                </Text>
                <Icon
                  name={categoryDropdownVisible ? "up" : "down"}
                  size={14}
                  color={colors.secondary}
                />
              </TouchableOpacity>
              {categoryDropdownVisible && (
                <View style={styles.dropdownContainer}>
                  <FlatList
                    data={eventCategories}
                    keyExtractor={(item) => item}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          setFilters((prev) => ({ ...prev, category: item }));
                          () =>
                            setUIState((prev) => ({
                              ...prev,
                              categoryDropdownVisible: false,
                            }));
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
              <TouchableOpacity
                style={styles.showResultsButton}
                onPress={applyFilters}
              >
                <Text style={styles.showResultsButtonText}>Show Results</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Home;
