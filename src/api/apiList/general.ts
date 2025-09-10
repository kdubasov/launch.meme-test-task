import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from "../constants";
import type { TToken } from "../../shared/types/tokens";

type TTokensPayload = {
  page: number;
}

const generalApi = createApi({
  reducerPath: 'generalApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTokens: builder.mutation<TToken[] | null, TTokensPayload>({
      query: ({ page }: TTokensPayload) => ({
        url: "/tokens",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({ page: String(page) }).toString(),
      }),
      transformResponse: (resp: { tokens: Record<string, TToken> }) => {
        const arr = resp?.tokens ? Object.values(resp.tokens) : [];
        return arr.length ? arr : null;
      },
    }),
  }),
});

export default generalApi;
