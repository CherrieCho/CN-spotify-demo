import axios from "axios"
import { SPOTIFY_BASE_URL } from "../config/commonConfig"
import { getNewReleaseResponse } from "../models/album";

export const getNewRelease = async(ClientCredentialToken: string): Promise<getNewReleaseResponse> => {
  try{
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`, {
      headers: {
        Authorization: `Bearer ${ClientCredentialToken}`,
      }
    });
    return response.data;
  }catch(error){
    throw new Error("failed to fetch new releases")
  }
}