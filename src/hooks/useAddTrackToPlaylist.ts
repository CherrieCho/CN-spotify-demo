import { useMutation, useQueryClient } from "@tanstack/react-query"

import { AddToPlaylistRequest } from "../models/playlist";
import { addTrackToPlaylist } from "../apis/playlistApi";

const useAddTrackToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playlist_id, ...params }: { playlist_id: string } & AddToPlaylistRequest) => {
      return addTrackToPlaylist(playlist_id, params);
    },
    onSuccess: () => {
      //새 플레이리스트 생성 성공하면 플레이리스트 목록, 디테일 다시가져옴
      queryClient.invalidateQueries({queryKey: ["current-user-playlist"]});
      queryClient.invalidateQueries({queryKey: ["playlist-detail"]});
    }
  });
}

export default useAddTrackToPlaylist;