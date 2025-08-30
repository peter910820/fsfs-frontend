import axios from "axios";
// type
import type { AxiosResponse } from "axios";

export const getDirectory = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + "/api/directories");
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
  }
};

export const getFile = async (): Promise<AxiosResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL + "/api/files";
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
  }
};
