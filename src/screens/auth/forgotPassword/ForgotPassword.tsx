import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import InputField from "../../../components/inputField/InputField";
import useForgotPassword from "./useForgotPassword";
import { styles } from "./ForgotPasswordStyles";
import { colors } from "../../../constants/colors";

const ForgotPasswordScreen: React.FC = () => {
  const { email, setEmail, loading, handleSendEmail, handleLoginScreen } =
    useForgotPassword();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.desc}>
        Enter your email address to receive a password reset link.
      </Text>

      <InputField
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
        secureTextEntry={false}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSendEmail}>
        <Text style={styles.sendButtonText}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            "Send Reset Link"
          )}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleLoginScreen}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
