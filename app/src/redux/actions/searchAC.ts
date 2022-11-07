import { SET_SEARCH_VALUE } from "../types/searchTypes";

type SetSearchValue = {
  type: typeof SET_SEARCH_VALUE
  payload: string
}

export const setSearchValue = (newSearchValue : string) : SetSearchValue => ({
  type: SET_SEARCH_VALUE,
  payload: newSearchValue,
});
