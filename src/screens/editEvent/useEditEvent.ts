import { useRoute } from "@react-navigation/native";
import { EditEventRouteProp, Event } from "../../types/types";

export const useEditEvent = (): Event | undefined => {
  const route = useRoute<EditEventRouteProp>();
  return route.params?.eventInfo;
};
