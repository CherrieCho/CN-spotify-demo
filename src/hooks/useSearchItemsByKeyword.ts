import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchRequestParams } from "../models/search";
import { searchItemsByKeyword } from "../apis/searchApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
  //토큰 들고오기
  const ClientCredentialToken = useClientCredentialToken();
  //무한스크롤
  return useInfiniteQuery({
    queryKey: ['search', params],
    queryFn: ({pageParam = 0}) => {
      if(!ClientCredentialToken) throw new Error("no token available");
      return searchItemsByKeyword(ClientCredentialToken, {...params, offset: pageParam});
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      //다음 항목들 중 next page 정보가 있다면 다음페이지 불러오기
      const nextPageUrl =
      lastPage.tracks?.next ||
      lastPage.artists?.next ||
      lastPage.albums?.next ||
      lastPage.playlists?.next ||
      lastPage.shows?.next ||
      lastPage.episodes?.next  ||
      lastPage.audiobooks?.next;

      if(nextPageUrl){
        const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset): undefined
      }
      return undefined;
    },
  });
}

export default useSearchItemsByKeyword;