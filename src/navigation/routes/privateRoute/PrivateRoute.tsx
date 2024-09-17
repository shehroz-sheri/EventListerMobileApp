import usePrivateRoute from "./usePrivateRoute";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = usePrivateRoute();

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default PrivateRoute;
