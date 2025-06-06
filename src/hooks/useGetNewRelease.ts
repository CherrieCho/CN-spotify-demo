import { useQuery } from "@tanstack/react-query"
import { getNewRelease } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewRelease = () => {
  //토큰 들고오기
  const ClientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["newRelease"],
    queryFn: async ()=> {
      if(!ClientCredentialToken){
        throw new Error("no token available");
      }
      return getNewRelease(ClientCredentialToken);
    },
  });
}

export default useGetNewRelease;