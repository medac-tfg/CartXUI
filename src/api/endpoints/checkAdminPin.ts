import api from "..";
import { AxiosError } from "axios";

export const checkAdminPin = async (adminPin: string) => {
  try {
    const { data } = await api.post(`/api/cart/checkAdminPin`, {
      adminPin,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null; // Return null for not found
    } else {
      // Handle other errors (e.g., network issues, server errors)
      throw error; // Re-throw the error if it's not a 404
    }
  }
};

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};
