import { create } from "zustand";
import type { PostProps } from "../models/PostProps";



type PostStore = {
  posts: PostProps[];
  isLoading: boolean;
  error: string | null;

  setPosts: (posts: PostProps[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addPost: (post: PostProps) => void;
  updatePost: (id: number, updatedPost: PostProps) => void;
  deletePost: (postId: number) => void;
};

const usePostStore = create<PostStore>((set) => ({
  posts: [] as PostProps[],
  isLoading: false,
  error: null,

  setPosts: (posts) => set({ posts }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? updatedPost : post)),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
}));

export default usePostStore;
export type { PostStore };
