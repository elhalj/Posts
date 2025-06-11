import api from "./api";

// Service to handle API calls related to posts
const postService = {
    createPost: async (postData: { title: string; content: string }) => {
        const response = await api.post("/article/ajouterArticle", postData);
        return response.data;
    },

    getPosts: async () => {
        const response = await api.get("/article/toutArticles");
        return response.data;
    },

    getPostById: async (postId: string) => {
        const response = await api.get(`/article/${postId}`);
        return response.data;
    },

    updatePost: async (postId: string, postData: { title: string; content: string }) => {
        const response = await api.put(`/article/${postId}`, postData);
        return response.data;
    },

    deletePost: async (postId: string) => {
        const response = await api.delete(`/article/${postId}`);
        return response.data;
    },
};

export default postService;
