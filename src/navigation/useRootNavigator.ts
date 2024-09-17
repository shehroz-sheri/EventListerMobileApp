import { useEffect } from "react";
import { initializeAuth } from "../redux/slices/userAuthSlice";
import { useAppDispatch } from "../hooks/useStore";

export const useRootNavigator = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(initializeAuth());
    return () => unsubscribe();
  }, [dispatch]);

  return {};
};
