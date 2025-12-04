export type User = {
  id: number;
  name: string;
  email: string;
};

export type Password = {
  password: string;
  repeatedPwd: string;
};

export type RegisterUser = Omit<User, 'id'> & Password;

export type RegisterUserData = Omit<User, 'id'> & { password: string };

export type UpdateUser = Omit<User, 'id'> & Partial<Password>;

export type LoginUser = {
  email: string;
  password: string;
};

export type FormErrors<T> = Partial<Record<keyof T, string>>;
