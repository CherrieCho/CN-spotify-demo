import axios from "axios"
import { clientID, clientSecret } from "../config/authConfig";
import { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth";
import { REDIRECT_URI } from "../config/commonConfig";

const encodedBase64 = (data: string): string => {
  if(typeof window !== "undefined"){
    //브라우저 환경
    return btoa(data);
  }else{
    //node.js 환경
    return Buffer.from(data).toString("base64");
  }
};

export const getClientCredentialToken = async(): Promise<ClientCredentialTokenResponse> => {
  try{
    const body = new URLSearchParams({
      grant_type: "client_credentials"
    })
    const response = await axios.post("https://accounts.spotify.com/api/token", body, {
      headers: {
        Authorization: `Basic ${encodedBase64(`${clientID}:${clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return response.data;
  }catch(error){
    throw new Error("failed to fetch client credential token");
  }
};

export const exchangeToken = async (code: string, codeVerifier: string): Promise<ExchangeTokenResponse> => {
  try{
    const url = "https://accounts.spotify.com/api/token";
    if( !clientID || !REDIRECT_URI){
      throw new Error("missing required parameters");
    }
    const body = new URLSearchParams({
      client_id: clientID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  }catch(error){
    throw new Error("failed to fetch token");
  }
};