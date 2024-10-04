export type MessageType = {
  _id: string;
  usersIds: string[];
  creatorId: string;
  message: string;
  timestamp: Date;
  isArchived: boolean;
  seen: boolean;
  isEdited: boolean;
  replyToMessageId?: string;
};
