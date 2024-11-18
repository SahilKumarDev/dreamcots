import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    user: null,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check", {
          credentials: "include",
        });
        const data = await response.json();
        setUser({
          isAuthenticated: data.isAuthenticated,
          user: data.user,
        });
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser({
          isAuthenticated: false,
          user: null,
        });
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/");
      location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { user: user.user, loading, handleLogout, isAuthenticated: user.isAuthenticated };
};
