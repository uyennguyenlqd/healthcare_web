import axios from "axios";

import { ENV } from "@/constants/env";

export const userServiceClient = axios.create({
  baseURL: `${ENV}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
