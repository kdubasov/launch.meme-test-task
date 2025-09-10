import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TToken } from "../../shared/types/tokens";
import { TRootState } from "../store";

interface ILayout {
  tokens: TToken[] | null;
  activeToken: TToken | null;
  isTokensLoading: boolean;
  searchValue: string
}

const initialState: ILayout = {
  tokens: null,
  activeToken: null,
  isTokensLoading: false,
  searchValue: '',
};

const assignDefined = <T extends object>(target: T, src: Partial<T>) => {
  (Object.entries(src) as [keyof T, T[keyof T]][]).forEach(([k, v]) => {
    if (v !== undefined) {
      target[k] = v;
    }
  });
};

export const layout = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TToken[] | null>) => {
      state.tokens = action.payload;
    },
    setActiveToken: (state, action: PayloadAction<TToken | null>) => {
      state.activeToken = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setOneToken: (state, action: PayloadAction<Partial<TToken>>) => {
      if (!state?.tokens || state?.tokens?.length <= 0) {
        return;
      }

      const patch = action.payload;
      const item = state.tokens.find(t => t.token === patch.token);
      if (!item) return;

      // меняем только указанные ключи; undefined не затирает существующие значения
      assignDefined(item, patch);
    },
    addToken: (state, action: PayloadAction<TToken>) => {
      if (!state?.tokens || state?.tokens?.length <= 0) {
        return
      }

      state.tokens.unshift(action.payload);
      if (state.tokens.length > 1) {
        state.tokens.pop();
      }
    },
    setIsTokensLoading: (state, action: PayloadAction<boolean>) => {
      state.isTokensLoading = action.payload;
    },
  },
});

export const selectTokens = (store: TRootState) => store.layout.tokens
export const selectActiveToken = (store: TRootState) => store.layout.activeToken
export const selectIsTokensLoading = (store: TRootState) => store.layout.isTokensLoading
export const selectSearchValue = (store: TRootState) => store.layout.searchValue

export const { setTokens, setIsTokensLoading, setOneToken, addToken, setSearchValue, setActiveToken } = layout.actions;
export default layout.reducer;
