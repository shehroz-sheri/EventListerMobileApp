import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigation } from "../../../hooks/useNavigation";
import { useEffect } from "react";

const usePublicRoute = () => {
  const { user } = useSelector((state: RootState) => state.userAuth);
  const navigation = useNavigation();

  const isAuthenticated = !!user;

  const redirectToMainTabs = () => navigation.navigate("MainTabs");

  useEffect(() => {
    if (isAuthenticated && user?.emailVerified) {
      redirectToMainTabs();
    }
  }, [isAuthenticated, user, navigation]);

  return { isAuthenticated };
};

export default usePublicRoute;
