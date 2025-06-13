import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPlaylist } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  //프로필에서 user id 불러오기
  const {data: user} = useGetCurrentUserProfile();
  return useMutation({
    mutationFn: (params: CreatePlaylistRequest) => {
      if(user?.id){
        return createPlaylist(user.id, params);
      }
      return Promise.reject(new Error("user is not defined"));
    },
    onSuccess: () => {
      //새 플레이리스트 생성 성공하면 useGetCurrentUserPlaylist 실행하기(플레이리스트 목록 다시가져옴)
      queryClient.invalidateQueries({queryKey: ["current-user-playlist"]});
    }
  });
}

export default useCreatePlaylist;