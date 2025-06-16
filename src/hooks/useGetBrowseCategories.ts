import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../apis/categoryApi";
import { BrowseCategoriesRequest } from "../models/browse";
import useClientCredentialToken from "./useClientCredentialToken";


const useGetBrowseCategories = (params: BrowseCategoriesRequest) => {
  //토큰 들고오기
  const ClientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["browse-categories", params],
    queryFn: async ()=> {
      if(!ClientCredentialToken){
        throw new Error("no token available");
      }
      return getCategories(params, ClientCredentialToken);
    },
    enabled: !!ClientCredentialToken,
  });
}

export default useGetBrowseCategories;