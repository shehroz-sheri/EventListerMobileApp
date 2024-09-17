import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { useTicketDetail } from "./useTicketDetail";
import { colors } from "../../constants/colors";
import EventPrice from "../../components/eventPrice/EventPrice";
import { formatEventDate } from "../../utils/formatEventDate";
import Loader from "../../components/loader/Loader";
import { styles } from "./TicketDetailStyles";

const TicketDetail: React.FC = () => {
  const { event, loading, barcodeImg } = useTicketDetail();

  if (loading) return <Loader color="white" backgroundColor={colors.dark} />;

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <View style={styles.container}>
        <View>
          <View>
            <Image
              source={{
                uri:
                  event?.eventMediaUrl || "https://via.placeholder.com/300x150",
              }}
              style={styles.cardImage}
            />
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{event?.eventType}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardHeading}>{event?.eventName}</Text>
              <EventPrice ticketPrice={event?.ticketPrice} />
            </View>
            <View style={styles.userInfoContainer}>
              <View style={styles.flexContainer}>
                <Text style={styles.eventInfoHeading}>Ticket Holder</Text>
                <Text style={styles.eventInfoHeading}>Date</Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.eventInfoText}>{event?.userName}</Text>
                <Text style={styles.eventInfoText}>
                  {formatEventDate(event?.createdAt?.toDateString())}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.eventInfoHeading}>Location</Text>
              <Text style={styles.eventInfoText}>{event?.eventLocation}</Text>
            </View>
            <View style={styles.ticketCutLine}></View>
            <View style={styles.barcodeContainer}>
              {barcodeImg ? (
                <Image
                  style={styles.barcodeImage}
                  source={{ uri: barcodeImg?.uri }}
                />
              ) : (
                <Text>Loading Barcode...</Text>
              )}
            </View>
            <Text style={styles.scanBarcodeText}>Scan the barcode</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TicketDetail;
