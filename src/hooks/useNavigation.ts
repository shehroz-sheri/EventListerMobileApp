import { useNavigation as useReactNavigation } from "@react-navigation/native";
import { NavigationProp } from "../types/types";

export const useNavigation = () => useReactNavigation<NavigationProp>();
