import { useMutation, useQueryClient } from "@tanstack/react-query"
import { exchangeToken } from "../apis/authApi"
import { ExchangeTokenResponse } from "../models/auth.js";

const useExchangeToken = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ExchangeTokenResponse, Error, {code: string, codeVerifier: string}>({
    mutationFn: ({code, codeVerifier}) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      //유저프로필 가져오는 훅의 쿼리 id 가져와서 캐시값 무효화(다시 실행시킴)
      queryClient.invalidateQueries({
        queryKey: ['current-user-profile'],
      })
    },
  });
};

export default useExchangeToken;