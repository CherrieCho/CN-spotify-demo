import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getCurrentUserProfile } from "../apis/userApi"
import { User } from "../models/user";

const useGetCurrentUserProfile = (): UseQueryResult<User, Error>  => {
  const accessToken = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ['current-user-profile'],
    queryFn: getCurrentUserProfile,
    enabled: !!accessToken  //accessToken이 있을때만(로그인헀을때만) 실행하기
  })
}

export default useGetCurrentUserProfile;