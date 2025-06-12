import { create } from "zustand";

type PostProps = {
  _id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  comments?: {
    id: number;
    author: string;
    date: string;
    content?: string;
  }[];
};

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
  posts: [],
  isLoading: false,
  error: null,

  setPosts: (posts) => set({ posts }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) => (post._id === id ? updatedPost : post)),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postId),
    })),
}));

export default usePostStore;
export type { PostProps, PostStore };
