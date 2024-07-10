import { DoctorModel } from "./doctors";
import { UserProfileModel } from "./users";

export interface BookingModel {
  _id: string;
  doctor: DoctorModel;
  user: UserProfileModel;
  ticketPrice: number;
  appointmentDate: string;
  timeslot: string;
  status: string;
  isPaid: boolean;
  notes: string;
  file_upload: string;
}
