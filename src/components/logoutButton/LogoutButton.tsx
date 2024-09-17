import { Text, TouchableOpacity } from "react-native";
import { useLogoutButton } from "./useLogoutButton";
import { styles } from "./LogoutButtonStyles";

const LogoutButton: React.FC = () => {
  const { handleLogout } = useLogoutButton();

  return (
    <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
