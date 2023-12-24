import axios, { AxiosResponse } from "axios";

export const GetBooksList = async (): Promise<AxiosResponse> => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/books/");
      return response;
    } catch (error) {
      throw error;
    }
  };

export const GetBook = async (id: number): Promise<AxiosResponse> => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);
    return res;
  } catch (error) {
    // Handle error or throw it
    throw error;
  }
};
    
export const AddBook = async (data: FormData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/books/", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const EditBook = async (id: number, data: FormData): Promise<AxiosResponse> => {
  try {
    const response = await axios.patch(`http://127.0.0.1:8000/api/books/${id}/`, data);
    return response.data;
  } catch (error) {
    throw error; // You can handle errors in the component using .catch
  }
};

export const DeleteBook = async (id: number): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`);
    return response;
  } catch (error) {
    throw error; // You can handle errors in the component using .catch
  }
};
