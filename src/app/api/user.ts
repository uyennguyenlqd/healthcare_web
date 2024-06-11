import { userServiceClient } from "@/config/axios/userService";
import {
  UseModelResetForgotPassword,
  UserModelLogin,
  UserModelRegister,
} from "@/interfaces/models/users";

export const AuthApi = {
  register: (data: UserModelRegister) => {
    return userServiceClient.post("/auth/register", data);
  },
  login: (data: UserModelLogin) => {
    return userServiceClient.post("/auth/login", data);
  },
  forgotPassword: (email: string) => {
    return userServiceClient.post("/auth/forgotpassword", { email });
  },
  resetForgotPassword: (data: UseModelResetForgotPassword) => {
    return userServiceClient.post(
      `/auth/resetpassword/${data.id}/${data.token}`,
      { newpassword: data.newpassword }
    );
  },
};
