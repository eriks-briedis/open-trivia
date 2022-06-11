export interface Question {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface DisplayQuestion {
  question: string;
  answers: string[];
}

export interface QuestionListResponse {
  response_code: number;
  results: Question[];
}
