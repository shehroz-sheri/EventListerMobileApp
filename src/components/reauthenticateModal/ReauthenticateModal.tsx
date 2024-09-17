import { TextInput, Modal, View, Text, Button } from "react-native";
import { ReauthenticateModalProps } from "../../types/types";
import { useReauthenticateModal } from "./useReauthenticateModal";
import { styles } from "./ReauthenticateModalStyles";

const ReauthenticateModal: React.FC<ReauthenticateModalProps> = ({
  isVisible,
  onClose,
  onReauthenticate,
}) => {
  const { password, setPassword, loading, handleReauthenticate } =
    useReauthenticateModal(onReauthenticate);

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.heading}>
          Please enter your current password to change Email
        </Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button
          disabled={loading}
          title={loading ? "Loading..." : "Submit"}
          onPress={handleReauthenticate}
        />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default ReauthenticateModal;
