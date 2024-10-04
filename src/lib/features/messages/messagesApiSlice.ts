import { MessageType } from "@/types/message";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/messages`,
  }),
  reducerPath: "messageApi",
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query<
      MessageType[],
      { limit?: number; offset?: number; chatId: string }
    >({
      query: ({ chatId }) => `/chat/${chatId}`,
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<
      MessageType,
      { message: string; chatId: string }
    >({
      query: ({ chatId, message }) => ({
        url: `/send?message=${message}&chatId=${chatId}`,
        method: "POST",
      }),
    }),
    updateMessage: builder.mutation<
      MessageType,
      { messageId: string; newMessage: MessageType }
    >({
      query: ({ messageId, newMessage }) => ({
        url: `/update/${messageId}`,
        method: "PUT",
        body: newMessage,
      }),
    }),
    deleteMessage: builder.mutation<MessageType, string>({
      query: (messageId) => ({
        url: `/delete/${messageId}`,
        method: "DELETE",
      }),
    }),
    archiveMessage: builder.mutation<MessageType, { messageId: string }>({
      query: ({ messageId }) => ({
        url: `/archive/${messageId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useArchiveMessageMutation,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApiSlice;
