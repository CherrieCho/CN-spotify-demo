import { AddToPlaylistRequest, CreatePlaylistRequest, GetAddToPlaylistResponse, GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, Playlist } from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylist = async({limit, offset}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try{
    const response = await api.get(`/me/playlists`, {
      params: {limit, offset}
    });
    return response.data;
  }catch(error){
    throw new Error("failed to fetch current user's playlist");
  }
}

export const getPlaylist = async (params: GetPlaylistRequest): Promise<Playlist> => {
  try{
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  }catch(error){
    throw new Error("failed to fetch playlist detail");
  }
}

export const getPlaylistItems = async(params: GetPlaylistItemsRequest): Promise<GetPlaylistItemsResponse> => {
  try{
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  }catch(error){
    throw new Error("failed to fetch playlist items");
  }
}

export const createPlaylist = async(user_id: string, params: CreatePlaylistRequest): Promise<Playlist> => {
  try{
    const {name, playlistPublic, collaborative, description} = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });
    return response.data;
  }catch(error){
    throw new Error("failed to create playlist");
  }
}

export const addTrackToPlaylist = async(playlist_id: string, params: AddToPlaylistRequest): Promise<GetAddToPlaylistResponse> => {
  try{
    const {uris, position} = params;
    const response = await api.post(`/playlists/${playlist_id}/tracks`, {
      uris,
      position
    });
    return response.data; 
  }catch(error){
    throw new Error("failed to add to playlist");
  }
}