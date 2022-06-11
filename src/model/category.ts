export interface Category {
  id: number;
  name: string;
}

export interface CategoryListResponse {
  trivia_categories: Category[];
}
