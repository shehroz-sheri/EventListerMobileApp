import { useState } from "react";
import { showToast } from "../../utils/toastUtils";

export const useReauthenticateModal = (
  onReauthenticate: (password: string) => void
) => {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleReauthenticate = () => {
    if (password.length > 0) {
      try {
        setLoading(true);
        onReauthenticate(password);
        setPassword("");
      } catch (error) {
        showToast("error", "Something went wrong, please try again later");
      } finally {
        setLoading(false);
      }
    } else showToast("error", "Please enter your password");
  };

  return {
    password,
    setPassword,
    loading,
    handleReauthenticate,
  };
};
