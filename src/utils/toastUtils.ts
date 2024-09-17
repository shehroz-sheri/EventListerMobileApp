import Toast from "react-native-toast-message";
import { ToastType } from "../types/types";

export const showToast = (type: ToastType, text1: string, text2?: string) => {
  Toast.show({
    visibilityTime: 4500,
    autoHide: true,
    swipeable: true,
    type,
    text1,
    text2,
  });
};
