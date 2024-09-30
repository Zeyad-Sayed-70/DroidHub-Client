import { NotificationType } from "@/types/notification";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationsApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/notifications`,
  }),
  reducerPath: "notificationApi",
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    getNotificationsByUser: builder.mutation<
      NotificationType[],
      { userId: string; tab: string }
    >({
      query: ({ tab, userId }) => `/${userId}?tab=${tab}`,
      invalidatesTags: ["Notifications"],
    }),
    archiveNotification: builder.mutation<NotificationType, string>({
      query: (notificationId) => ({
        url: `/archive/${notificationId}`,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetNotificationsByUserMutation,
  useArchiveNotificationMutation,
} = notificationsApiSlice;
