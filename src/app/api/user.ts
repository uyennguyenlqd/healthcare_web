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
      { newpassword: data.newpassword },
    );
  },
};

export const UserApi = {
  updateUser: (id: string) => {
    return userServiceClient.put(`users/update_user/${id}`);
  },
  getUserProfile: (id: string) => {
    return userServiceClient.get(`users/get_user/${id}`);
  },
};
