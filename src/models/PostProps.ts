export type PostProps = {
  id: number;
  title: string;
  description: string;
  content: string;
  image: File | null | undefined;
  author: string;
  createdAt?: string | number | undefined;
  category: string;
  tags: string[];
  comments?: {
    id: number;
    author: string;
    date: string;
    content?: string;
  }[];
};