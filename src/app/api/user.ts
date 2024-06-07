import { userServiceClient } from "@/config/axios/userService";
import { UserModelLogin, UserModelRegister } from "@/interfaces/models/users";

export const AuthApi = {
  register: (data: UserModelRegister) => {
    return userServiceClient.post("/auth/register", data);
  },
  login: (data: UserModelLogin) => {
    return userServiceClient.post("/auth/login", data);
  },
};
