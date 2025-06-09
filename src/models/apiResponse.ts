export interface ApiResponse<T> {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
  items: T[]; //동적인 값은 제네릭 타입으로
}