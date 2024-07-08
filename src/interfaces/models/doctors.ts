import { UserProfileModel } from "./users";

export interface Specialty {
  _id: string;
  name_specialty: string;
  description?: string;
  icon?: string;
}
export interface Hospital {
  _id: string;
  hospital_name: string;
  address?: string;
  phone?: string;
  website_url?: string;
}
interface Experience {
  years: string;
  description: string;
}
interface Review {
  _id: string;
  doctor: string;
  user: UserProfileModel;
  reviewText: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
export interface DoctorModel {
  _id: string;
  first_name: string;
  last_name: string;
  gender?: string;
  day_of_birth?: string;
  experiences: Experience[];
  specialty?: Specialty;
  hospital?: Hospital;
  reviews: Review[];
  address?: string;
  avatar?: string;
  email: string;
  totalRating?: number;
  averageRating?: number;
  phone?: string;
  roles: string;
  bio?: string;
  timeslots?: {
    start: string;
    end: string;
    _id?: string;
  }[];
}
