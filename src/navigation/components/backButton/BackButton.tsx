import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./BackButtonStyles";
import { BackButtonProps } from "../../../types/types";

export const BackButton: React.FC<BackButtonProps> = ({
  navigation,
  backgroundColor,
  color = "black",
  borderWidth = 0.5,
}) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={[styles.backButtonContainer, { backgroundColor, borderWidth }]}
  >
    <Icon name="arrow-back" size={22} color={color} />
  </TouchableOpacity>
);
