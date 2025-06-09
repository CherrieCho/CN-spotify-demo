import { useQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylist } from "../apis/playlistApi"
import { GetCurrentUserPlaylistRequest } from "../models/playlist"

const useGetCurrentUserPlaylist = ({limit, offset}: GetCurrentUserPlaylistRequest) => {
  return useQuery({
    queryKey: ["current-user-playlist"],
    queryFn: () => getCurrentUserPlaylist({limit, offset})
  })
}

export default useGetCurrentUserPlaylist;