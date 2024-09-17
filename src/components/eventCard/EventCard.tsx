import { Image, Text, TouchableOpacity, View } from "react-native";
import { EventType } from "../../types/types";
import EventPrice from "../eventPrice/EventPrice";
import { formatEventDate } from "../../utils/formatEventDate";
import { styles } from "../../screens/home/HomeStyles";

export const EventCard: React.FC<{ item: EventType; onPress: () => void }> = ({
  item,
  onPress,
}) => (
  <TouchableOpacity key={item?.id} onPress={onPress}>
    <View style={styles.cardContainer}>
      <View>
        <Image
          source={{
            uri:
              item?.eventMediaUrl ||
              "https://eu.ui-avatars.com/api/?name=Event+Image&size=250",
          }}
          style={styles.cardImage}
        />
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{item?.eventType}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardHeading}>{item?.eventName}</Text>
            <View style={styles.creatorInfo}>
              <Image
                source={{
                  uri:
                    item?.creatorImageUrl || "https://via.placeholder.com/50",
                }}
                style={styles.creatorImage}
              />
              <Text style={styles.creatorName}>{item?.userName}</Text>
            </View>
          </View>
          <EventPrice ticketPrice={parseInt(item?.ticketPrice)} />
        </View>
        <View style={styles.horizontalLine} />
        <Text style={styles.eventDate}>
          {formatEventDate(new Date(item?.eventDate)?.toDateString())}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
