import { useEffect, useState } from "react";
import { Passwords } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { RootState } from "../../redux/store";
import { resetPassword } from "../../redux/slices/resetPasswordSlice";
import { showToast } from "../../utils/toastUtils";

export const initialPasswordState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export const useResetPassword = () => {
  const [passwords, setPasswords] = useState<Passwords>(initialPasswordState);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state: RootState) => state.resetPassword
  );

  const handleChange = (name: keyof Passwords, value: string) =>
    setPasswords((prev) => ({ ...prev, [name]: value }));

  const handleResetPassword = () => dispatch(resetPassword(passwords));

  useEffect(() => {
    if (error) {
      showToast(
        "error",
        "Error",
        error === "auth/invalid-credential" ? "Invalid Credentials" : error
      );
    }
  }, [error]);

  return { passwords, loading, handleChange, handleResetPassword };
};
