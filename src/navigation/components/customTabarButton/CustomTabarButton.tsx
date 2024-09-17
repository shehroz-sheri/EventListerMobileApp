import { TouchableOpacity } from "react-native";
import { CustomTabBarButtonProps } from "../../../types/types";
import { styles } from "./CustomTabarButtonStyles";

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({
  children,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.tabButton, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;
