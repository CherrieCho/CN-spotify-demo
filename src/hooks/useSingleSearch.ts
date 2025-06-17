import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { SearchRequestParams } from "../models/search";
import { searchItemsByKeyword } from "../apis/searchApi";

const useSingleSearch = (params: SearchRequestParams) => {
  const ClientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ['single-search', params],
    queryFn: () => {
      if (!ClientCredentialToken) throw new Error("no token");
      return searchItemsByKeyword(ClientCredentialToken, params);
    },
    enabled: !!params.q, // 예: 검색어 없으면 호출 안 하도록
  });
}

export default useSingleSearch;