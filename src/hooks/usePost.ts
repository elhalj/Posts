import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePostStore, { PostProps } from "../store/postStore"
import postService from "../services/api/postServices";


export const usePost = () => {
    const queryClient = useQueryClient();
    const { setPosts, setLoading, setError, addPost, updatePost, deletePost } = usePostStore();

    const handleSetPosts = useMutation({
        mutationFn: (newPost: PostProps) => postService.createPost(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    });

    const handleGetPosts = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            setLoading(true);
            try {
                const response = await postService.getPosts();
                setPosts(response.data);
                setLoading(false);
                return response.data;
            } catch (error) {
                if (
                    error &&
                    typeof error === "object" &&
                    "response" in error &&
                    error.response &&
                    typeof error.response === "object" &&
                    "data" in error.response &&
                    error.response.data &&
                    typeof error.response.data === "object" &&
                    "message" in error.response.data
                ) {
                    type ErrorResponse = { response: { data: { message: string } } };
                    setError((error as ErrorResponse).response.data.message);
                } else {
                    setError("An error occurred while fetching posts");
                }
                setLoading(false);
                throw error;
            }
        }
    })

    return {
        handleSetPosts,
        handleGetPosts,
    }
}