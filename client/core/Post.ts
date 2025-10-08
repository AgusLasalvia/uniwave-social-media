import { UserPostInfo } from "./User";

export interface Post {
  id: string;
  user: UserPostInfo;
  content: string;
  imageUrl?: [];
  likes: [];
  comments: [];
}

export interface CreatePostForm {
  content: string;
  image?: string;
  privacy: "public" | "friends" | "private";
}

export interface PostForm {
  content: string;
  imageUrl?: string;
  pickedImage?: string;
  privacy: "public" | "friends" | "private";
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: {
    name: string;
    avatar: string;
    university: string;
  };
  content: string;
  likes: number;
  createdAt: string;
}

export interface CreateCommentForm {
  content: string;
}

export interface PostLike {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface PostShare {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}
