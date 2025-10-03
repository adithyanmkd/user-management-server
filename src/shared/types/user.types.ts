export interface User {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  avatar: string;
}

export interface UserDocument extends User, Document {}
