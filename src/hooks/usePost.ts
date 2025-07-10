import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePostStore from "../store/postStore";
import postService from "../services/api/postServices";
import axios from "axios";
import type { PostProps } from "../models/PostProps";
// import type { CreatePostDTO } from "../services/api/postServices";

export const usePost = () => {
  const queryClient = useQueryClient();
  const { setPosts, setError } = usePostStore();

  const mutationKey = ["posts"];

  const handleCreatePosts = useMutation({
    mutationKey,
    mutationFn: async (newPost: FormData) => {
      await postService.createPost(newPost)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: mutationKey})
    } 
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