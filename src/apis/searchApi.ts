import axios from "axios";
import { SPOTIFY_BASE_URL } from "../config/commonConfig";
import { SearchRequestParams, SearchResponse } from "../models/search";

//credential token 받아오기
export const searchItemsByKeyword = async(token: string, params: SearchRequestParams): Promise<SearchResponse> => {
  try{
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q);
    searchParams.append("type", params.type.join(","));
    //optional한 리퀘스트 파라미터값
    if(params.market){
      searchParams.append("market", params.market);
    }
    if(params.limit){
      searchParams.append("limit", params.limit.toString());
    } 
    if(params.offset){
      searchParams.append("offset", params.offset.toString());
    }    
    if(params.include_external){
      searchParams.append("include_external", params.include_external);
    } 

    const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      }
    });
    return response.data;
  }catch(error){
    throw new Error("failed to search by keyword");
  }
}