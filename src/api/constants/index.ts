import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://launch.meme/api'

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // if (result?.error && result.error?.status === 403) {
  //   TOAST_INFO('Пользователь не авторизован!', 'no-auth-user');
  // }

  if (
    result?.error?.status !== 403 &&
    (result?.error || (result?.data as { success: boolean })?.success === false)
  ) {
    // const error = result?.error || new Error(undefined);
    // Sentry.captureException(error);
  }

  return result;
};
