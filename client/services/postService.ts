import api from "@/utils/api";

export const postService = {
  fetchPosts: async () => {
    const response = await api.get("/posts/latest");
    console.log(response.data);
    return response.data;
  },

  createPost: async (postData: any) => {
    const response = await api.post("/posts/create", postData);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error("Failed to create post");
  },
};
