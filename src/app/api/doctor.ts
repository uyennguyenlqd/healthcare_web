import { userServiceClient } from "@/config/axios/userService";
import { DoctorModel } from "@/interfaces/models/doctors";

export const DoctorApi = {
  getAllDoctor: () => {
    return userServiceClient.get("/doctor/get_all_doctor");
  },
  getAllSpecialty: () => {
    return userServiceClient.get("/specialty/get_all_specialty");
  },
  getDoctor: (id: string) => {
    return userServiceClient.get(`/doctor/get_doctor/${id}`);
  },
};
