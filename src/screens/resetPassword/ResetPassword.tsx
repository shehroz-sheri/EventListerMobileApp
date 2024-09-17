import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import InputField from "../../components/inputField/InputField";
import { useResetPassword } from "./useResetPassword";
import { resetPasswordFields } from "../../constants/constants";
import { styles } from "./ResetPasswordStyles";

const ResetPassword: React.FC = () => {
  const { loading, handleChange, handleResetPassword } = useResetPassword();

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {resetPasswordFields?.map(({ key, label, secureTextEntry }) => (
          <InputField
            key={key}
            onChangeText={(text) => handleChange(key, text)}
            label={label}
            secureTextEntry={secureTextEntry}
          />
        ))}
      </View>

      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.actionButtonText}>Reset Password</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;
