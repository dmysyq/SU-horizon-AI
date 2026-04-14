export type UserRole = 'student' | 'teacher';

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export const STORAGE_KEY = 'ch_f_user';
