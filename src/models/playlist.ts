import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Image, Owner } from "./commonType";
import { Episode, Track } from "./track";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

//플레이리스트 공통타입
export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}
export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  }
}

export interface Playlist extends BasePlaylist {
  tracks?: ApiResponse<PlaylistTrack>;

}

export interface PlaylistTrackObject {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode ;
}

export interface PlaylistTrack {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: PlaylistTrackObject[];
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;

}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>
export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>