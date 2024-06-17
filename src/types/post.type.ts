export type Reactions = {
  like: string[];
  comments: string[];
};

export type PostType = {
  _id?: string;
  __v?: number;
  creatorId: string;
  type: string; // 'text' | 'image' | 'video'
  content?: string;
  videos?: string[];
  images?: string[];
  tags?: string[];
  resources?: string[];
  caption?: string;
  createdAt: Date;
  reactions: Reactions;
  comments: string[];
};

export type UpdatePost = {
  content?: string;
  images?: string[];
  caption?: string;
};
