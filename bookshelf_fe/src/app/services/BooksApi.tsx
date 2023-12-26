import axios, { AxiosResponse } from "axios";
import { useContext } from "react";
import { UserTokenContext } from "../../App";

// export const GetBooksList = async (): Promise<AxiosResponse> => {
//     const contextValue = useContext(UserTokenContext);
//     console.log("contextValue in api***", contextValue)
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/books/");
//       return response;
//     } catch (error) {
//       throw error;
//     }
  // };
  export const GetBooksList = async (userToken: any): Promise<AxiosResponse> => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/books/", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };


export const GetBook = async (userToken: any, id: number): Promise<AxiosResponse> => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return res;
  } catch (error) {
    // Handle error or throw it
    throw error;
  }
};

export const AddBook = async (userToken: any, data: FormData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/books/", data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const EditBook = async (userToken: any, id: number, data: FormData): Promise<AxiosResponse> => {
  try {
    const response = await axios.patch(`http://127.0.0.1:8000/api/books/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error; // You can handle errors in the component using .catch
  }
};

export const DeleteBook = async (userToken: any, id: number): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error; // You can handle errors in the component using .catch
  }
};


export const GetSortedBookList = async (userToken:any, sortby?: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/books/', {
      params: {
        sortby: sortby, // Optional parameter for sorting
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetFilteredBookList = async (userToken:any, genre?: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/books/', {
      params: {
        genre: genre, // Optional parameter for sorting
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
