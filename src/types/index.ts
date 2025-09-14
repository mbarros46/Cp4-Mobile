export type BookStatus = 'lido' | 'lendo' | 'quero_ler';

export type Book = {
  id?: string;
  title: string;
  author?: string;
  genre?: string;
  status?: BookStatus;
  favorite?: boolean;
  createdAt?: any;
  updatedAt?: any;
  userId: string;
};
