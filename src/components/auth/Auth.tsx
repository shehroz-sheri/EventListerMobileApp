import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import InputField from "../inputField/InputField";
import { AuthProps } from "../../types/types";
import { useAuth } from "./useAuth";
import { GoogleLogo } from "../../assets";
import { styles } from "./AuthStyles";

const Auth: React.FC<AuthProps> = ({ isRegisterPage }) => {
  const {
    authLoading,
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    inputFields,
    handleTogglePage,
  } = useAuth(isRegisterPage);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.pageHeading}>
            {isRegisterPage ? "Register" : "Login"}
          </Text>

          <View style={styles.formContainer}>
            {inputFields
              .filter((field) => field.show)
              .map((field, index) => (
                <InputField
                  key={index}
                  label={field.label}
                  placeholder={field.placeholder}
                  onChangeText={field.onChangeText}
                  value={field.value}
                  keyboardType={
                    field.keyboardType as
                      | "default"
                      | "email-address"
                      | "numeric"
                  }
                  secureTextEntry={field?.secureTextEntry}
                  loginPage={field?.loginPage}
                />
              ))}

            <View style={styles.switchPageContainer}>
              <Text style={styles.switchPageText}>
                {isRegisterPage
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
              </Text>
              <TouchableOpacity onPress={handleTogglePage}>
                <Text style={styles.switchPageLink}>
                  {isRegisterPage ? "Login" : "Register"} Here.
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={isRegisterPage ? handleRegister : handleLogin}
              disabled={authLoading}
            >
              {authLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.actionButtonText}>
                  {isRegisterPage ? "Create a New Account" : "Login"}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
            >
              <GoogleLogo width={48} height={48} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Auth;
