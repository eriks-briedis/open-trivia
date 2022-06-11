import type { CategoryListResponse, QuestionListResponse } from '../model';

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

  public async getQuestions(body: Record<string, any>): Promise<QuestionListResponse> {
    const requestUrl = new URL(`${this.apiUrl}/api.php`);
    Object.keys(body)
      .filter((key) => !!body[key])
      .forEach((key) => requestUrl.searchParams.set(key, body[key] as string));

    const response = await fetch(requestUrl.toString());
    if (!response.ok) {
      throw new Error('Failed to load questions');
    }

    return response.json();
  }
}
