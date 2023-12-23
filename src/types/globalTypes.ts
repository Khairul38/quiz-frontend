export interface IUser {
  id?: string;
  name: string;
  email: string;
  role: string;
  contactNo?: string;
  address?: string;
  profileImg?: string;
  iat?: number;
  exp?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICategory {
  id?: string;
  name: string;
  quizs?: IQuiz[];
  createdAt?: string;
  updatedAt?: string;
}
export interface IQuiz {
  id?: string;
  question: string;
  creatorId: string;
  creator?: IUser;
  categoryId: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  quizAnswers?: IQuizAnswer[];
}

export interface IQuizAnswer {
  id?: string;
  quizId: string;
  answer: string;
  explanation: string;
  isTrue: boolean;
  createdAt?: string;
  updatedAt?: string;
}
