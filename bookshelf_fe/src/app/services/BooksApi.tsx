import axios, { AxiosResponse } from "axios";

export const GetBooksList = async (): Promise<AxiosResponse> => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/books/");
      return response;
    } catch (error) {
      throw error;
    }
  };
  
