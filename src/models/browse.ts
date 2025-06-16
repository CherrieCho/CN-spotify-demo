import { ApiResponse } from "./apiResponse";
import { Image } from "./commonType";

export interface BrowseCategoriesRequest {
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface Categories {
  categories: ApiResponse<CategoryItem>;
}

interface CategoryItem {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export type BrowseCategoriesResponse = Categories;