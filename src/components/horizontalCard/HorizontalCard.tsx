import { Image, Text, TouchableOpacity, View } from "react-native";
import { EventType } from "../../types/types";
import EventPrice from "../eventPrice/EventPrice";
import { formatEventDate } from "../../utils/formatEventDate";
import { styles } from "../../screens/home/HomeStyles";

export const HorizontalCard: React.FC<{ item: EventType; onPress: () => void }> = ({
  item,
  onPress,
}) => (
  <TouchableOpacity key={item?.id} onPress={onPress}>
    <View style={styles.horizontalOtherEventCardContainer}>
      <Image
        source={{
          uri:
            item?.eventMediaUrl ||
            `https://eu.ui-avatars.com/api/?name=Event+Image&size=250`,
        }}
        style={styles.horizontalOtherEventCardImage}
      />
      <View style={styles.horizontalOtherEventCardBody}>
        <View style={styles.horizontalOtherEventCardInfo}>
          <Text style={styles.otherEventBadgeText}>{item?.eventType}</Text>
          <EventPrice ticketPrice={parseInt(item?.ticketPrice)} />
        </View>
        <Text style={styles.otherEventCardHeading}>{item?.eventName}</Text>
        <Text style={styles.otherEventDate}>
          {formatEventDate(item?.eventDate)}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
