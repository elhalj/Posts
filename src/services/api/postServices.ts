import api from "./api";

type PostProps = {
    title: string;
    description: string;
    content: string;
    image: string;
    author: string;
    date: string;
    category: string;
    tags: string[];
}
// Service to handle API calls related to posts
const postService = {
    createPost: async (postData: PostProps) => {
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

    updatePost: async (postId: string, postData: PostProps) => {
        const response = await api.put(`/article/${postId}`, postData);
        return response.data;
    },

    deletePost: async (postId: string) => {
        const response = await api.delete(`/article/${postId}`);
        return response.data;
    },
};

export default postService;
