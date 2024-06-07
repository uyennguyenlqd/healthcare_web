export interface UserModelRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmpassword: string;
}
export interface UserModelLogin {
  email: string;
  password: string;
}
