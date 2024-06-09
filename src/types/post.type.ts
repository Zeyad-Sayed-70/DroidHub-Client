export type Reactions = {
  like: number;
  comments: number;
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
};

export type UpdatePost = {
  content?: string;
  images?: string[];
  caption?: string;
};
