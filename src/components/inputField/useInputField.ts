import { useNavigation } from "../../hooks/useNavigation";

export const useInputField = () => {
  const navigation = useNavigation();
  const handleForgotPassword = () => navigation.navigate("ForgotPassword");

  return { handleForgotPassword };
};
