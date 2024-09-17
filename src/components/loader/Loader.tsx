import { View, ActivityIndicator } from "react-native";
import { colors } from "../../constants/colors";
import { styles } from "./LoaderStyles";
import { LoaderProps } from "../../types/types";

const Loader: React.FC<LoaderProps> = ({
  backgroundColor = "white",
  color = colors.primary,
}) => {
  return (
    <View style={[styles.loaderContainer, { backgroundColor }]}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Loader;
