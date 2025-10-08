import api from "@/utils/api";

export const universityService = {
  async getAllActiveUniversities() {
    const response = await api.get("/universities/all");

    if (response.status === 200) return response.data;

    if (response.status === 404) return undefined;
  },

  async getUniversityByID(id?: string) {
    const response = await api.get(`/universities/find?id=${id}`);

    if (response.status === 200) return response.data;

    if (response.status === 400 || response.status === 404) {
      return "Universidad no encontrada";
    }
  },
};
