import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "./appwrite";
import useAuthStore from "./stores/authStore";

const useAuth = () => {
  const { user, loading, setUser, setLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = account.get().then(async (user) => {
      if (!user) {
        setLoading(false);
        navigate("/auth");
      } else {
        setUser(user);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe.then(() => setLoading(false));
    };
  }, [navigate, setLoading, setUser]);

  return { user, loading, setLoading };
};

export default useAuth;
