import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "./appwrite";
import useAuthStore from "./stores/authStore";

const useAuth = () => {
  const { user, loading, setUser, setLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        // User is not logged in or session expired
        console.log("Authentication check failed:", error);
        setUser(null);

        if (
          window.location.pathname !== "/auth" &&
          window.location.pathname !== "/"
        ) {
          navigate("/auth");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, setLoading, setUser]);

  return { user, loading, setLoading };
};

export default useAuth;
