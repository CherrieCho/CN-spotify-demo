import { useInfiniteQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylist } from "../apis/playlistApi"
import { GetCurrentUserPlaylistRequest } from "../models/playlist"

const useGetCurrentUserPlaylist = ({limit, offset}: GetCurrentUserPlaylistRequest) => {
  //무한스크롤
  return useInfiniteQuery({
    queryKey: ["current-user-playlist"],
    queryFn: ({pageParam = 0}) => getCurrentUserPlaylist({limit, offset: pageParam}),
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

export default useGetCurrentUserPlaylist;