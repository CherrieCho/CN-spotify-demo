import { useInfiniteQuery } from "@tanstack/react-query"
import { GetPlaylistItemsRequest } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
  //무한스크롤
  return useInfiniteQuery({
    queryKey: ['playlist-items', params],
    queryFn: ({pageParam = 0}) => {
      const { offset, ...restParams } = params;
      return getPlaylistItems({ offset: pageParam, ...restParams });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if(lastPage.next){
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetPlaylistItems;