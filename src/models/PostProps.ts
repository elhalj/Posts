export type PostProps = {
  _id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  author: { id: number; name: string; date: string };
  createdAt: string;
  category: string;
  tags: string[];
  comments?: {
    id: number;
    author: string;
    date: string;
    content?: string;
  }[];
};