/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {CoinGecko, CryptoGraph} from './types'

export const CryptoApi = createApi({
  reducerPath: "CryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/", headers: {'x-cg-demo-api-key': import.meta.env.VITE_coingeckoapicode} }),
  endpoints: (builder) => ({
   getTopTenCrypto: builder.query<CoinGecko[],string>({
      query: () => `/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=10`,
    }),
    getCryptoGraph: builder.query<CryptoGraph[],string>({
      query: (id: string) => `coins/${id}/market_chart/range?vs_currency=brl&from=1609459200&to=1640908800&precision=2`,
    }),
  }),
});

export const { useGetTopTenCryptoQuery, useGetCryptoGraphQuery } = CryptoApi;
