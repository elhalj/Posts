import { PostProps } from "../../models/PostProps";
import api from "./api";

export type CreatePostDTO = Omit<PostProps, 'id' | 'createdAt' | 'comments'>;

const postService = {
    createPost: async (formData: FormData) => {
        const response = await api.post("/article/ajouterArticle", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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
    
    updatePost: async (postId: string, postData: FormData) => {
        const response = await api.put(`/article/${postId}`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    
    deletePost: async (postId: string) => {
        const response = await api.delete(`/article/${postId}`);
        return response.data;
    },
};

export default postService;