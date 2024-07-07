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
export interface UseModelResetForgotPassword {
  id: string;
  token: string;
  newpassword: string;
}
export interface UserProfileModel {
  _id: string;
  first_login?: boolean;
  first_name: string;
  last_name: string;
  gender?: string;
  day_of_birth?: string;
  address?: string;
  avatar?: string;
  email: string;
  phone?: string;
  roles: string;
}
