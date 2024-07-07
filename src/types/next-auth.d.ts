import { DefaultUser } from "next-auth";
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { role: string };
  }
  interface User extends DefaultUser {
    role: string;
    first_name: string;
    last_name: string;
    avatar: string;
    token: string;
  }
}
