import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigation } from "../../../hooks/useNavigation";
import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useStore";
import { clearUser } from "../../../redux/slices/userAuthSlice";

const usePrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.userAuth);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const isAuthenticated = !!user;

  const redirectToLogin = () => {
    dispatch(clearUser());
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated, dispatch, navigation]);

  return { isAuthenticated };
};

export default usePrivateRoute;
