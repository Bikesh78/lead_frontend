import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../customBaseQuery";

export const leadApi = createApi({
  reducerPath: "leadApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Leads"],
  endpoints: (builder) => ({
    getLeads: builder.query({
      query: (page) => `/api/lead?paginate=1&limit=10&page=${page}`,
      providesTags: ["Leads"],
    }),
    postLeads: builder.mutation({
      query: (data) => ({
        url: `/api/lead`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (res, error) => (error ? [] : ["Leads"]),
    }),
    updateLead: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/lead/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (res, error) => (error ? [] : ["Leads"]),
    }),
    deleteLead: builder.mutation({
      query: (id) => ({
        url: `/api/lead/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, error) => (error ? [] : ["Leads"]),
    }),
  }),
});

export const {
  useGetLeadsQuery,
  usePostLeadsMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadApi;
