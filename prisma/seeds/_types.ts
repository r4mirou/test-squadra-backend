export type Permission = {
  id?: number;
  name: string;
  description: string;
};

export type Role = {
  id?: number;
  name: string;
  description: string;
};

export type User = {
  id?: number;
  name: string | null;
  email: string;
  password: string;
  roleId: number;
};
