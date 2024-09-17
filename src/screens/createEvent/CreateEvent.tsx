import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
  FlatList,
  TouchableHighlight,
  Image,
} from "react-native";
import InputField from "../../components/inputField/InputField";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCreateEvent } from "./useCreateEvent";
import { CreateEventProps } from "../../types/types";
import { colors } from "../../constants/colors";
import { UploadIcon } from "../../assets";
import { styles } from "./CreateEventStyles";
import { eventTypeOptions } from "../../constants/constants";

const CreateEvent: React.FC<CreateEventProps> = ({ eventParam }) => {
  const {
    eventDetails,
    eventType,
    loading,
    isDropdownOpen,
    eventMedia,
    showDatePicker,
    selectedDate,
    fields,
    handleChange,
    handleSelectImage,
    handlePublishEvent,
    handleOptionSelect,
    onDateChange,
    handleUpdateEvent,
    setShowDatePicker,
    setIsDropdownOpen,
  } = useCreateEvent(eventParam);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {eventParam ? "Edit" : "Create"} an Event
      </Text>
      <ScrollView>
        <View>
          {fields?.map((field) => (
            <InputField
              key={field?.key}
              prefix={field?.prefix}
              onChangeText={(text) => handleChange(field?.key, text)}
              placeholder={field?.placeholder}
              label={field?.label}
              keyboardType={field?.keyboardType}
              defaultValue={field?.defaultValue}
            />
          ))}

          <Text style={styles.label}>Event Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {selectedDate
                ? selectedDate?.toDateString()
                : eventDetails?.eventDate?.length > 0
                ? eventDetails?.eventDate
                : "Select Date"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={onDateChange}
            />
          )}

          <Text style={styles.label}>Event Type</Text>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.dropdownText}>
                {eventType || "Select Type"}
              </Text>
              <Icon name="arrow-right" size={14} color={colors.secondary} />
            </TouchableOpacity>
            {isDropdownOpen && (
              <Modal
                transparent={true}
                animationType="slide"
                visible={isDropdownOpen}
                onRequestClose={() => setIsDropdownOpen(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.dropdownModal}>
                    <FlatList
                      data={eventTypeOptions}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableHighlight
                          style={styles.dropdownItem}
                          onPress={() => handleOptionSelect(item)}
                        >
                          <Text style={styles.dropdownItemText}>{item}</Text>
                        </TouchableHighlight>
                      )}
                    />
                  </View>
                </View>
              </Modal>
            )}
          </View>
          <Text style={styles.label}>Event Media</Text>
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={handleSelectImage}
          >
            {eventMedia ? (
              <Image
                source={{ uri: eventMedia }}
                style={{ width: "100%", height: "100%", borderRadius: 25 }}
                resizeMode="cover"
              />
            ) : (
              <>
                <UploadIcon />
                <Text style={styles.uploadText}>Upload Image</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.eventButton}
            onPress={eventParam ? handleUpdateEvent : handlePublishEvent}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>
                {eventParam ? "Update Event" : "Publish Event"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateEvent;
