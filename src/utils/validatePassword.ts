import { ERROR_MESSAGES } from "../constants/constants";
import { Passwords } from "../types/types";
import { showToast } from "./toastUtils";

export const validatePasswords = (passwords: Passwords): boolean => {
  const { oldPassword, newPassword, confirmNewPassword } = passwords;

  if (!oldPassword || !newPassword || !confirmNewPassword) {
    showToast("error", ERROR_MESSAGES.EMPTY_FIELDS);
    return false;
  }

  if (newPassword !== confirmNewPassword) {
    showToast("error", ERROR_MESSAGES.PASSWORD_MISMATCH);
    return false;
  }

  if (oldPassword === newPassword) {
    showToast("error", ERROR_MESSAGES.SAME_PASSWORD);
    return false;
  }

  return true;
};
