import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage?.getItem("lead_access_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export default customBaseQuery;
