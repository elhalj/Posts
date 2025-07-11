import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePostStore from "../store/postStore";
import postService from "../services/api/postServices";
import axios from "axios";
import type { PostProps } from "../models/PostProps";

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

  const handleUpdatePost = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: async ({ id, postData }: { id: number; postData: FormData }) => {
      return await postService.updatePost(id.toString(), postData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mutationKey });
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Une erreur s'est produite lors de la mise à jour"
        );
      } else {
        setError("Une erreur inattendue s'est produite");
      }
    }
  });

  const handleDeletePost = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (postId: string) => {
      return await postService.deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mutationKey });
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Une erreur s'est produite lors de la suppression"
        );
      } else {
        setError("Une erreur inattendue s'est produite");
      }
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

  const handleGetPostById = useQuery<PostProps, Error>({
    queryKey: ["post"],
    queryFn: async () => {
      // Cette query sera activée manuellement quand nécessaire
      throw new Error("Cette query doit être activée manuellement");
    },
    enabled: false,
  });

  return {
    handleCreatePosts,
    handleUpdatePost,
    handleDeletePost,
    handleGetPosts,
    handleGetPostById,
  };
};