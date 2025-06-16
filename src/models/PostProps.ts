export type PostProps = {
  _id: number;
  title: string;
  description: string;
  content: string;
  image: string | File | null;
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