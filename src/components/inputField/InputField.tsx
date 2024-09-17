import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { InputFieldProps } from "../../types/types";
import { useInputField } from "./useInputField";
import { colors } from "../../constants/colors";
import { styles } from "./InputFieldStyles";

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  label,
  loginPage = false,
  prefix,
  defaultValue,
}) => {
  const { handleForgotPassword } = useInputField();

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={[styles.input, prefix && styles.inputWithPrefix]}
          placeholder={placeholder}
          placeholderTextColor={colors.silver}
          defaultValue={defaultValue}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
      {loginPage && (
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
