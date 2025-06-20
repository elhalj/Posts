import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePostStore from "../store/postStore";
import postService from "../services/api/postServices";
import axios from "axios";
import type { PostProps } from "../models/PostProps";
import type { CreatePostDTO } from "../services/api/postServices";

export const usePost = () => {
  const queryClient = useQueryClient();
  const { setPosts, addPost, setError } = usePostStore();

  const handleCreatePosts = useMutation({
    mutationFn: async (newPost: CreatePostDTO) => {
      const formData = new FormData();
      Object.entries(newPost).forEach(([key, value]) => {
        if (key === "tags" && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      const response = await postService.createPost(formData);
      return response;
    },
    onSuccess: (data) => {
      addPost(data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleGetPosts = useQuery<PostProps[], Error>({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const response = await postService.getPosts();
        setPosts(response.data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "An error occurred while fetching posts"
          );
        } else {
          setError("An unexpected error occurred");
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    handleCreatePosts,
    handleGetPosts,
  };
};