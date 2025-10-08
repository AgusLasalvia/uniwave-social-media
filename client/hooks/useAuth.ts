import { useEffect, useState } from "react";
import { storage } from "@/utils/storage";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await storage.getItem("token");
      const user = await storage.getItem("user_profile");
      setIsAuthenticated(!!token && !!user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  return { isAuthenticated, loading };
}
