import usePublicRoute from "./usePublicRoute";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = usePublicRoute();

  if (isAuthenticated) return null;

  return children;
};

export default PublicRoute;
