import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../customBaseQuery";

export const interactionApi = createApi({
  reducerPath: "interactionApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Interactions"],
  endpoints: (builder) => ({
    getLeadInteractions: builder.query({
      query: ({ page, leadId }) =>
        `/api/interaction/lead/${leadId}?paginate=1&limit=10&page=${page}`,
      providesTags: ["Interactions"],
    }),
    postInteractions: builder.mutation({
      query: (data) => ({
        url: `/api/interaction`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (res, error) => (error ? [] : ["Interactions"]),
    }),
    updateInteraction: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/interaction/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (res, error) => (error ? [] : ["Interactions"]),
    }),
    deleteInteraction: builder.mutation({
      query: (id) => ({
        url: `/api/interaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, error) => (error ? [] : ["Interactions"]),
    }),
  }),
});

export const {
  useGetLeadInteractionsQuery,
  usePostInteractionsMutation,
  useUpdateInteractionMutation,
  useDeleteInteractionMutation,
} = interactionApi;
