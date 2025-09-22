import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  // signup 
  signup: async (userName, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorText;
        } catch (_e) {
          // Ignore parsing error, use raw text
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      const { data } = responseData; // Destructure the nested data object

      if (!data.user || !data.token) {
        throw new Error("Signup successful, but server did not return user data or token.");
      }

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user, isLoading: false });
      return { success: true };

    } catch (error) {
      set({ isLoading: false });
      console.error("Caught error in signup:", error);
      return { success: false, error: error.message };
    }
  },

// login
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorText;
        } catch (_e) {
          // Ignore parsing error, use raw text
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      const { data } = responseData; // Destructure the nested data object

      if (!data.user || !data.token) {
        throw new Error("Login successful, but server did not return user data or token.");
      }
      
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user, isLoading: false });
      return { success: true };

    } catch (error) {
      set({ isLoading: false });
      console.error("Caught error in login:", error);
      return { success: false, error: error.message };
    }
  },
// checking auth on app start
  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // logout
  logout: async () => {
    try {
      const token = useAuthStore.getState().token;
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Failed to logout from server:", error);
    } finally {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ token: null, user: null });
    }
  },
}));