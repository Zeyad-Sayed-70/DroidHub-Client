export interface NotificationType {
  _id: string;
  userId: string;
  message: string;
  seen: boolean;
  isArchived: boolean;
  timestamp: string;
}
