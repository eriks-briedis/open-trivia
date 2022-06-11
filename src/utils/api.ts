import type { CategoryListResponse } from '../model';

export class Api {
  apiUrl: string;

  constructor() {
    this.apiUrl = 'https://opentdb.com';
  }

  public async getCategories(): Promise<CategoryListResponse> {
    const response = await fetch(`${this.apiUrl}/api_category.php`);

    if (!response.ok) {
      throw new Error('Failed to load categories');
    }

    return response.json();
  }
}
