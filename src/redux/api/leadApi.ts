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
        url: `/admin/site-setting-contact-banner-section`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Leads"],
    }),
  }),
});

export const { useGetLeadsQuery, usePostLeadsMutation } = leadApi;
