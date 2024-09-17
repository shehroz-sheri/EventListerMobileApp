import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "../../components/inputField/InputField";
import Icon from "react-native-vector-icons/Feather";
import ReauthenticateModal from "../../components/reauthenticateModal/ReauthenticateModal";
import { useProfile } from "./useProfile";
import { styles } from "./ProfileStyles";

const Profile: React.FC = () => {
  const {
    userData,
    isModalVisible,
    loading,
    refreshing,
    onRefresh,
    setModalVisible,
    handleChange,
    handleTogglePage,
    pickImage,
    handleReauthenticate,
    handleUpdateProfile,
  } = useProfile();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: userData?.photoURL,
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={pickImage}
          >
            <Icon name="edit-2" color="white" size={8} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputFieldsContainer}>
          <InputField
            onChangeText={(text) => handleChange("displayName", text)}
            label="Name"
            defaultValue={userData?.displayName}
          />
          <InputField
            onChangeText={(text) => handleChange("email", text)}
            label="Email"
            keyboardType="email-address"
            defaultValue={userData?.email}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.updateContainer}
            onPress={handleUpdateProfile}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.updateText}>Update Profile</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resetPasswordContainer}
            onPress={handleTogglePage}
          >
            <Text style={styles.resetPassText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ReauthenticateModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onReauthenticate={handleReauthenticate}
      />
    </View>
  );
};

export default Profile;
