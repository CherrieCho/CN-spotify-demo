import axios from "axios"
import { SPOTIFY_BASE_URL } from "../config/commonConfig"
import { BrowseCategoriesRequest, BrowseCategoriesResponse } from "../models/browse";

export const getCategories = async(
  params: BrowseCategoriesRequest,
  ClientCredentialToken: string
): Promise<BrowseCategoriesResponse> => {
  try {
    const { locale, limit, offset } = params;
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
      headers: {
        Authorization: `Bearer ${ClientCredentialToken}`,
      },
      params: {
        locale,
        limit,
        offset,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("failed to fetch browse categories");
  }
};