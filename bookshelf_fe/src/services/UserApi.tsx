import axios, { AxiosResponse } from "axios";

export const loginUser = async (data: FormData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", data);
    return response;
  } catch (error) {
    throw error;
  }
};
