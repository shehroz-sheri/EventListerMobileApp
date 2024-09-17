import { Text, View } from "react-native";
import React from "react";
import { renderTicketPrice } from "../../utils/priceParsing";
import { styles } from "./EventPriceStyles";

const EventPrice = ({ ticketPrice }: { ticketPrice: number }) => {
  return (
    <View
      style={[
        styles.eventPriceContainer,
        ticketPrice <= 0 && styles.eventPriceFreeContainer,
      ]}
    >
      <Text
        style={[styles.eventPrice, ticketPrice <= 0 && styles.eventPriceFree]}
      >
        {renderTicketPrice(ticketPrice)}
      </Text>
    </View>
  );
};

export default EventPrice;
