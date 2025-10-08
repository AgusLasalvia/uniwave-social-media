import { UserProfile } from "@/core/User";
import api from "@/utils/api";
import { storage } from "@/utils/storage";

const USER_PROFILE_KEY = "user_profile";

export const userService = {
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const profileData = await storage.getItem(USER_PROFILE_KEY);
      if (profileData) {
        return JSON.parse(profileData);
      }
      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  },

  async updateUserProfile(updateForm: object): Promise<boolean> {
    try {
      const resposne = await api.patch("/user/update", updateForm);
      if (resposne.status !== 200) {
        return false;
      }
      storage.setItem("user_profile", JSON.stringify(updateForm)); // Converts the object to a string
      return true;
    } catch (err: any) {
      return false;
    }
  },

  async getUserStats(): Promise<any | null> {
    try {
      const response = await api.get("/user/stats");
      if (response.status !== 200) {
        return null;
      }
      return response.data;
    } catch (err: any) {
      return err;
    }
  },
};
