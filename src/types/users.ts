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

export type UpdateUser = Omit<User, 'id'> & Partial<Password>;

export type LoginUser = {
  email: string;
  password: string;
};
